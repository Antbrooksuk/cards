import { ACTION_TYPES, GAME_STATUS, TARGET_SCORE_INCREMENT, MAX_PLAYS_PER_ROUND, MAX_DISCARDS_PER_ROUND } from '../../constants/gameConstants'
import { handleNewRound, handleWordValidation, handleCardDealing, getLegendaryLetterPlayed } from './gameHelpers'
import { createDeck, hasVowels, shuffleArray } from '../../utils/cardUtils'
import { getDefaultState } from './stateHelpers'

export const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      if (state.gameStatus === GAME_STATUS.PLAYING) {
        return state
      }
      return {
        ...getDefaultState(),
        gameStatus: GAME_STATUS.PLAYING,
      }

    case ACTION_TYPES.ADD_WORD: {
      const { word, isValid, validation } = action.payload
      const normalizedWord = word.toLowerCase()

      if (state.wordHistory.all.some(w => w.word === normalizedWord)) {
        return state
      }

      const wordResult = handleWordValidation(state, normalizedWord, isValid, validation)
      const newScore = wordResult.score || state.score
      const newRoundScore = wordResult.roundScore || state.roundScore
      const newPlaysUsed = state.playsUsed + 1
      const legendaryLetter = getLegendaryLetterPlayed(state, isValid)

      if (newPlaysUsed >= MAX_PLAYS_PER_ROUND && newRoundScore < state.targetScore) {
        return {
          ...state,
          gameStatus: GAME_STATUS.GAME_OVER,
          score: newScore,
          roundScore: newRoundScore,
          playsUsed: newPlaysUsed,
          wordHistory: {
            ...state.wordHistory,
            valid: wordResult.words || state.wordHistory.valid,
            invalid: wordResult.invalidWords || state.wordHistory.invalid,
            all: wordResult.all,
            current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
          },
        }
      }

      if (state.debugMode) {
        const updatedState = {
          ...state,
          score: newScore,
          roundScore: newRoundScore,
          playsUsed: newPlaysUsed,
          wordHistory: {
            ...state.wordHistory,
            valid: wordResult.words || state.wordHistory.valid,
            invalid: wordResult.invalidWords || state.wordHistory.invalid,
            all: wordResult.all,
            current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
          },
        }

        if (newRoundScore >= state.targetScore) {
          updatedState.gameStatus = GAME_STATUS.ROUND_COMPLETE
        }

        return updatedState
      }

      let updatedDeck = state.deck
      let newHand = state.playerHand
      let canReshuffleHand = state.canReshuffle

      if (newRoundScore < state.targetScore) {
        const dealResult = handleCardDealing(state, state.wordHistory.current.selectedIndices)
        updatedDeck = dealResult.deck
        newHand = dealResult.playerHand
        canReshuffleHand = !hasVowels(newHand)
      }

      return {
        ...state,
        score: newScore,
        roundScore: newRoundScore,
        playsUsed: newPlaysUsed,
        deck: updatedDeck,
        playerHand: newHand,
        canReshuffle: canReshuffleHand,
        legendaryLetterPlayed: legendaryLetter,
        wordHistory: {
          ...state.wordHistory,
          valid: wordResult.words || state.wordHistory.valid,
          invalid: wordResult.invalidWords || state.wordHistory.invalid,
          all: wordResult.all,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
        gameStatus: newRoundScore >= state.targetScore ? GAME_STATUS.ROUND_COMPLETE : state.gameStatus,
      }
    }

    case ACTION_TYPES.END_ROUND:
      return { ...state, gameStatus: GAME_STATUS.ROUND_COMPLETE }

    case ACTION_TYPES.SHOW_ROUND_END:
      return { ...state, gameStatus: GAME_STATUS.ROUND_END }

    case ACTION_TYPES.START_NEXT_ROUND:
      if (state.currentRound >= 3) {
        return { ...state, gameStatus: GAME_STATUS.GAME_OVER }
      }

      const { deck: nextDeck, playerHand: nextHand, canReshuffle: nextReshuffle } = handleNewRound(createDeck())
      return {
        ...state,
        gameStatus: GAME_STATUS.PLAYING,
        currentRound: state.currentRound + 1,
        wordHistory: {
          valid: [],
          invalid: [],
          all: state.wordHistory.all,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
        roundScore: 0,
        targetScore: state.targetScore + TARGET_SCORE_INCREMENT,
        playsUsed: 0,
        legendaryLetterPlayed: null,
        deck: nextDeck,
        playerHand: nextHand,
        canReshuffle: nextReshuffle,
        discardsUsed: 0,
      }

    case ACTION_TYPES.PLAY_AGAIN:
      return getDefaultState()

    case ACTION_TYPES.TOGGLE_DEBUG:
      return { ...state, debugMode: !state.debugMode }

    case ACTION_TYPES.CLEAR_NEW_FLAGS:
      return {
        ...state,
        playerHand: state.playerHand.map(card => ({ ...card, isNew: false })),
      }

    case ACTION_TYPES.ADD_LETTER: {
      const { letter, cardIndex } = action.payload

      if (cardIndex < 0 || cardIndex >= state.playerHand.length) {
        console.warn('Invalid card index:', cardIndex)
        return state
      }

      if (state.wordHistory.current.selectedIndices.includes(cardIndex)) {
        console.log('Card already selected')
        return state
      }

      if (state.wordHistory.current.hasLegendaryLetter) {
        console.log('Prevented adding letter after legendary')
        return state
      }

      if (state.playerHand[cardIndex].letter.toLowerCase() !== letter.toLowerCase()) {
        console.warn('Letter mismatch:', { provided: letter, actual: state.playerHand[cardIndex].letter })
        return state
      }

      return {
        ...state,
        wordHistory: {
          ...state.wordHistory,
          current: {
            text: state.wordHistory.current.text + letter,
            selectedIndices: [...state.wordHistory.current.selectedIndices, cardIndex],
            hasLegendaryLetter: state.wordHistory.current.hasLegendaryLetter,
          },
        },
      }
    }

    case ACTION_TYPES.REMOVE_LETTER:
      return {
        ...state,
        wordHistory: {
          ...state.wordHistory,
          current: {
            text: state.wordHistory.current.text.slice(0, -1),
            selectedIndices: state.wordHistory.current.selectedIndices.slice(0, -1),
            hasLegendaryLetter: false,
          },
        },
      }

    case ACTION_TYPES.CLEAR_WORD:
      return {
        ...state,
        wordHistory: {
          ...state.wordHistory,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
      }

    case ACTION_TYPES.DISCARD_CARDS: {
      const selectedCount = state.wordHistory.current.selectedIndices.length
      if (state.discardsUsed + selectedCount > MAX_DISCARDS_PER_ROUND || selectedCount === 0) {
        return state
      }

      const { deck: discardDeck, playerHand: discardHand } = handleCardDealing(
        state,
        state.wordHistory.current.selectedIndices,
      )

      return {
        ...state,
        deck: discardDeck,
        playerHand: discardHand,
        wordHistory: {
          ...state.wordHistory,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
        canReshuffle: !hasVowels(discardHand),
        discardsUsed: state.discardsUsed + selectedCount,
      }
    }

    case ACTION_TYPES.RESHUFFLE_HAND:
      if (state.roundScore >= state.targetScore) {
        return state
      }
      return {
        ...state,
        playerHand: shuffleArray([...state.playerHand]).map(card => ({
          ...card,
          isNew: false,
        })),
        wordHistory: {
          ...state.wordHistory,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
      }

    case ACTION_TYPES.RESHUFFLE_DECK:
      if (state.roundScore >= state.targetScore) {
        return state
      }

      const {
        deck: reshuffledDeck,
        playerHand: reshuffledHand,
        canReshuffle: reshuffleReshuffle,
      } = handleNewRound(shuffleArray([...state.deck, ...state.playerHand]))

      return {
        ...state,
        deck: reshuffledDeck,
        playerHand: reshuffledHand,
        canReshuffle: reshuffleReshuffle,
        wordHistory: {
          ...state.wordHistory,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
      }

    case ACTION_TYPES.REORDER_HAND: {
      const { fromIndex, toIndex } = action.payload
      const reorderedHand = [...state.playerHand]
      const [movedCard] = reorderedHand.splice(fromIndex, 1)
      reorderedHand.splice(toIndex, 0, movedCard)

      const updatedIndices = state.wordHistory.current.selectedIndices.map(index => {
        if (index === fromIndex) return toIndex
        if (fromIndex < toIndex) {
          if (index > fromIndex && index <= toIndex) return index - 1
        } else {
          if (index < fromIndex && index >= toIndex) return index + 1
        }
        return index
      })

      return {
        ...state,
        playerHand: reorderedHand,
        wordHistory: {
          ...state.wordHistory,
          current: {
            ...state.wordHistory.current,
            selectedIndices: updatedIndices,
          },
        },
      }
    }

    default:
      console.warn(`Unknown action type: ${action.type}`)
      return state
  }
}