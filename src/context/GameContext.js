import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react'
import {
  createDeck,
  shuffleArray,
  dealCards,
  hasVowels,
} from '../utils/cardUtils'
import { calculateWordTotalScore } from '../utils/scoreUtils'
import useWordValidation from '../hooks/useWordValidation'
import { WORD_LENGTH } from '../constants/wordConstants'
import {
  INITIAL_TARGET_SCORE,
  TARGET_SCORE_INCREMENT,
  MAX_DISCARDS_PER_ROUND,
  MAX_LETTERS_PER_DISCARD,
  INITIAL_GAME_STATUS,
  GAME_STATUS,
  MAX_HAND_SIZE,
  LEGENDARY_LETTERS,
  ACTION_TYPES,
} from '../constants/gameConfig'

// Helper functions
const handleNewRound = (deck, handSize = MAX_HAND_SIZE) => {
  const shuffledDeck = shuffleArray(deck)
  const { dealtCards, remainingDeck } = dealCards(shuffledDeck, handSize)
  const hasVowelsInHand = hasVowels(dealtCards)

  return {
    deck: remainingDeck,
    playerHand: dealtCards.map(card => ({ ...card, isNew: true })),
    canReshuffle: !hasVowelsInHand,
  }
}

const handleWordValidation = (state, word, isValid, validation) => {
  const result = {
    words: state.wordHistory.valid,
    invalidWords: state.wordHistory.invalid,
  }

  if (isValid) {
    const { score: wordScore } = calculateWordTotalScore(
      word,
      validation.wordType,
    )
    result.score = Number(state.score) + wordScore
    result.roundScore = Number(state.roundScore) + wordScore
    result.words = [...result.words, { word, type: validation.wordType }]
  } else {
    result.invalidWords = [...result.invalidWords, word]
  }

  // Store the word in chronological order
  result.all = [
    ...state.wordHistory.all,
    {
      word,
      type: isValid ? validation.wordType : null,
      timestamp: Date.now(),
    },
  ]

  return result
}

const isValidDiscard = state => {
  return !(
    state.discardsUsed >= MAX_DISCARDS_PER_ROUND ||
    state.wordHistory.current.selectedIndices.length >
      MAX_LETTERS_PER_DISCARD ||
    state.roundScore >= state.targetScore
  )
}

const canAddLetter = (state, letter) => {
  const isLegendary =
    letter === LEGENDARY_LETTERS.WILD || letter === LEGENDARY_LETTERS.SPECIAL
  return !state.wordHistory?.current?.hasLegendaryLetter || !isLegendary
}

const GameContext = createContext()

const initialState = {
  // Game configuration
  minWordLength: WORD_LENGTH.MIN,
  maxWordLength: WORD_LENGTH.MAX,
  debugMode: false,

  // Game state
  gameStatus: INITIAL_GAME_STATUS,
  currentRound: 1,
  score: 0,
  roundScore: 0,
  targetScore: INITIAL_TARGET_SCORE,

  // Word tracking
  wordHistory: {
    valid: [], // Valid words for current round [{word: string, type: string}]
    invalid: [], // Invalid words for current round
    all: [], // All words across rounds
    current: {
      text: '',
      selectedIndices: [],
      hasLegendaryLetter: false,
    },
  },

  // Card management
  deck: [],
  playerHand: [],
  canReshuffle: false,
  discardsUsed: 0,
  legendaryLetterPlayed: null,
}

// Helper function to handle dealing new cards
const handleCardDealing = (state, selectedIndices) => {
  // Get the cards to remove based on selected indices
  const usedCards = selectedIndices.map(index => state.playerHand[index])

  // Create new hand without the used cards
  const remainingHand = state.playerHand.filter(
    (_, index) => !selectedIndices.includes(index),
  )

  // Add used cards to bottom of deck
  const updatedDeck = [...state.deck, ...usedCards]

  // Deal new cards to replace used ones
  const dealResult = dealCards(updatedDeck, selectedIndices.length)

  // Create new hand with new cards added to the end, marking them as new
  const newHand = [
    ...remainingHand.map(card => ({ ...card, isNew: false })),
    ...dealResult.dealtCards.map(card => ({ ...card, isNew: true })),
  ]

  return {
    deck: dealResult.remainingDeck,
    playerHand: newHand,
    newCardCount: dealResult.dealtCards.length,
  }
}

const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.START_GAME:
      const {
        deck: startDeck,
        playerHand: startHand,
        canReshuffle: startReshuffle,
      } = handleNewRound(createDeck())
      return {
        ...initialState,
        gameStatus: GAME_STATUS.PLAYING,
        deck: startDeck,
        playerHand: startHand,
        canReshuffle: startReshuffle,
      }

    case ACTION_TYPES.ADD_WORD:
      const { word, isValid, validation } = action.payload
      const normalizedWord = word.toLowerCase()

      // Check if word has been played before
      if (state.wordHistory.all.some(w => w.word === normalizedWord)) {
        return state
      }

      const wordResult = handleWordValidation(
        state,
        normalizedWord,
        isValid,
        validation,
      )
      const newScore = wordResult.score || state.score
      const newRoundScore = wordResult.roundScore || state.roundScore

      // Handle debug mode
      if (state.debugMode) {
        const updatedState = {
          ...state,
          score: newScore,
          roundScore: newRoundScore,
          wordHistory: {
            ...state.wordHistory,
            valid: wordResult.words || state.wordHistory.valid,
            invalid: wordResult.invalidWords || state.wordHistory.invalid,
            all: wordResult.all,
            current: {
              text: '',
              selectedIndices: [],
              hasLegendaryLetter: false,
            },
          },
        }

        if (newRoundScore >= state.targetScore) {
          updatedState.gameStatus = GAME_STATUS.ROUND_COMPLETE
        }

        return updatedState
      }

      // Handle normal mode
      const { deck: updatedDeck, playerHand: newHand } = handleCardDealing(
        state,
        state.wordHistory.current.selectedIndices,
      )

      return {
        ...state,
        score: newScore,
        roundScore: newRoundScore,
        deck: updatedDeck,
        playerHand: newHand,
        canReshuffle: !hasVowels(newHand),
        wordHistory: {
          ...state.wordHistory,
          valid: wordResult.words || state.wordHistory.valid,
          invalid: wordResult.invalidWords || state.wordHistory.invalid,
          all: wordResult.all,
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
        gameStatus:
          newRoundScore >= state.targetScore
            ? GAME_STATUS.ROUND_COMPLETE
            : state.gameStatus,
      }

    case ACTION_TYPES.END_ROUND:
      return {
        ...state,
        gameStatus: GAME_STATUS.ROUND_COMPLETE,
      }

    case ACTION_TYPES.SHOW_ROUND_END:
      return {
        ...state,
        gameStatus: GAME_STATUS.ROUND_END,
      }

    case ACTION_TYPES.START_NEXT_ROUND:
      if (state.currentRound >= 3) {
        return {
          ...state,
          gameStatus: GAME_STATUS.GAME_OVER,
        }
      }

      const {
        deck: nextDeck,
        playerHand: nextHand,
        canReshuffle: nextReshuffle,
      } = handleNewRound(createDeck())
      return {
        ...state,
        gameStatus: GAME_STATUS.PLAYING,
        currentRound: state.currentRound + 1,
        wordHistory: {
          valid: [],
          invalid: [],
          all: state.wordHistory.all, // Preserve game history
          current: { text: '', selectedIndices: [], hasLegendaryLetter: false },
        },
        roundScore: 0,
        targetScore: state.targetScore + TARGET_SCORE_INCREMENT,
        legendaryLetterPlayed: null,
        deck: nextDeck,
        playerHand: nextHand,
        canReshuffle: nextReshuffle,
        discardsUsed: 0,
      }

    case ACTION_TYPES.PLAY_AGAIN:
      return initialState

    case ACTION_TYPES.TOGGLE_DEBUG:
      return {
        ...state,
        debugMode: !state.debugMode,
      }

    case ACTION_TYPES.CLEAR_NEW_FLAGS:
      return {
        ...state,
        playerHand: state.playerHand.map(card => ({ ...card, isNew: false })),
      }

    case ACTION_TYPES.ADD_LETTER: {
      const { letter, cardIndex } = action.payload
      if (!state.wordHistory.current.selectedIndices.includes(cardIndex)) {
        const isLegendary =
          letter === LEGENDARY_LETTERS.WILD ||
          letter === LEGENDARY_LETTERS.SPECIAL

        // Prevent adding more letters after legendary
        if (state.wordHistory.current.hasLegendaryLetter) {
          return state
        }

        const updatedCurrent = {
          text: state.wordHistory.current.text + letter,
          selectedIndices: [
            ...state.wordHistory.current.selectedIndices,
            cardIndex,
          ],
          hasLegendaryLetter: isLegendary,
        }

        return {
          ...state,
          wordHistory: {
            ...state.wordHistory,
            current: updatedCurrent,
          },
          legendaryLetterPlayed: isLegendary
            ? letter
            : state.legendaryLetterPlayed,
        }
      }
      return state
    }

    case ACTION_TYPES.REMOVE_LETTER:
      return {
        ...state,
        wordHistory: {
          ...state.wordHistory,
          current: {
            text: state.wordHistory.current.text.slice(0, -1),
            selectedIndices: state.wordHistory.current.selectedIndices.slice(
              0,
              -1,
            ),
            hasLegendaryLetter: false, // Reset on removal
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

    case ACTION_TYPES.DISCARD_CARDS:
      if (!isValidDiscard(state)) {
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
        discardsUsed: state.discardsUsed + 1,
      }

    case ACTION_TYPES.RESHUFFLE_HAND:
      if (state.roundScore >= state.targetScore) {
        return state
      }

      return {
        ...state,
        playerHand: shuffleArray([...state.playerHand]),
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

    default:
      console.warn(`Unknown action type: ${action.type}`)
      return state
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [error, setError] = React.useState(null)

  // Auto-start game if initial status is 'playing'
  React.useEffect(() => {
    if (INITIAL_GAME_STATUS === GAME_STATUS.PLAYING) {
      dispatch({ type: ACTION_TYPES.START_GAME })
    }
  }, [])

  // Clear error after 3 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const { validateWord } = useWordValidation({
    minWordLength: initialState.minWordLength,
    maxWordLength: initialState.maxWordLength,
  })

  const safeDispatch = useCallback(action => {
    try {
      dispatch(action)
    } catch (err) {
      console.error('Game action error:', err)
      setError(err.message)
    }
  }, [])

  const addWord = useCallback(
    async word => {
      try {
        const validation = await validateWord(word)
        safeDispatch({
          type: ACTION_TYPES.ADD_WORD,
          payload: {
            word: word.toLowerCase(),
            isValid: validation.isValid,
            validation,
          },
        })
        return validation
      } catch (err) {
        console.error('Word validation error:', err)
        setError('Failed to validate word')
        return { isValid: false, error: err.message }
      }
    },
    [validateWord, safeDispatch],
  )

  const value = useMemo(
    () => ({
      ...state,
      error,
      // Expose word history and maintain backward compatibility
      wordHistory: state.wordHistory,
      words: state.wordHistory.valid,
      invalidWords: state.wordHistory.invalid,
      currentWord: state.wordHistory.current.text,
      selectedCards: state.wordHistory.current.selectedIndices,
      // Actions
      startGame: () => safeDispatch({ type: ACTION_TYPES.START_GAME }),
      addWord,
      toggleDebug: () => safeDispatch({ type: ACTION_TYPES.TOGGLE_DEBUG }),
      addLetter: (letter, cardIndex) =>
        safeDispatch({
          type: ACTION_TYPES.ADD_LETTER,
          payload: { letter, cardIndex },
        }),
      removeLetter: () => safeDispatch({ type: ACTION_TYPES.REMOVE_LETTER }),
      clearWord: () => safeDispatch({ type: ACTION_TYPES.CLEAR_WORD }),
      endRound: () => safeDispatch({ type: ACTION_TYPES.END_ROUND }),
      showRoundEnd: () => safeDispatch({ type: ACTION_TYPES.SHOW_ROUND_END }),
      startNextRound: () =>
        safeDispatch({ type: ACTION_TYPES.START_NEXT_ROUND }),
      playAgain: () => safeDispatch({ type: ACTION_TYPES.PLAY_AGAIN }),
      discardCards: () => safeDispatch({ type: ACTION_TYPES.DISCARD_CARDS }),
      reshuffleHand: () => safeDispatch({ type: ACTION_TYPES.RESHUFFLE_HAND }),
      reshuffleDeck: () => safeDispatch({ type: ACTION_TYPES.RESHUFFLE_DECK }),
      clearNewFlags: () => safeDispatch({ type: ACTION_TYPES.CLEAR_NEW_FLAGS }),
      // Expose deck and hand for components
      deck: state.deck,
      playerHand: state.playerHand,
      canReshuffle: state.canReshuffle,
    }),
    [state, error, addWord, safeDispatch],
  )

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
