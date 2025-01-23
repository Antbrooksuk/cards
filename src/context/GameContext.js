import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
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
} from '../constants/gameConfig'

const GameContext = createContext()

const initialState = {
  // Game configuration
  minWordLength: WORD_LENGTH.MIN,
  maxWordLength: WORD_LENGTH.MAX,
  debugMode: false,

  // Game state
  gameStatus: INITIAL_GAME_STATUS, // welcome, playing, roundComplete, roundEnd, gameOver
  currentRound: 1,
  score: 0,
  roundScore: 0,
  targetScore: INITIAL_TARGET_SCORE,
  words: [], // Valid words for current round [{word: string, type: string}]
  invalidWords: [], // Invalid words for current round
  allWords: [], // All words used across rounds (both valid and invalid)
  deck: [], // Current deck of cards
  playerHand: [], // Player's current hand of cards
  currentWord: '', // Current word being built
  selectedCards: [], // Indices of selected cards in playerHand
  canReshuffle: false, // Whether player can reshuffle their hand
  discardsUsed: 0, // Track number of discards used in current round
  legendaryLetterPlayed: null, // Track if ! or ? has been played in current round
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
    case 'START_GAME':
      const startDeck = shuffleArray(createDeck())
      const { dealtCards, remainingDeck } = dealCards(startDeck, 10)
      const hasVowelsAtStart = hasVowels(dealtCards)
      return {
        ...initialState,
        gameStatus: 'playing',
        deck: remainingDeck,
        playerHand: dealtCards.map(card => ({ ...card, isNew: true })),
        newCardCount: dealtCards.length,
        canReshuffle: !hasVowelsAtStart,
      }

    case 'ADD_WORD':
      const { word, isValid, validation } = action.payload
      const normalizedWord = word.toLowerCase()

      // Check if word has been played before
      if (
        state.allWords.some(w =>
          typeof w === 'string'
            ? w === normalizedWord
            : w.word === normalizedWord,
        )
      ) {
        return state
      }

      if (isValid) {
        const { score: wordScore } = calculateWordTotalScore(
          normalizedWord,
          validation.wordType || 'unknown',
        )
        const newScore = Number(state.score) + wordScore
        const newRoundScore = Number(state.roundScore) + wordScore

        // In debug mode, just add the word without dealing with cards
        if (state.debugMode) {
          const updatedState = {
            ...state,
            words: [
              ...state.words,
              { word: normalizedWord, type: validation.wordType },
            ],
            allWords: [
              ...state.allWords,
              { word: normalizedWord, type: validation.wordType },
            ],
            score: newScore,
            roundScore: newRoundScore,
          }

          if (newRoundScore >= state.targetScore) {
            updatedState.gameStatus = 'roundComplete'
          }

          return updatedState
        }

        // Normal mode - handle cards
        if (newRoundScore >= state.targetScore) {
          // Remove used cards from hand but don't deal new ones
          const remainingHand = state.playerHand.filter(
            (_, index) => !state.selectedCards.includes(index),
          )

          return {
            ...state,
            words: [
              ...state.words,
              { word: normalizedWord, type: validation.wordType },
            ],
            allWords: [
              ...state.allWords,
              { word: normalizedWord, type: validation.wordType },
            ],
            score: newScore,
            roundScore: newRoundScore,
            currentWord: '',
            selectedCards: [],
            playerHand: remainingHand,
            gameStatus: 'roundComplete',
          }
        }

        // Only deal new cards if round target hasn't been reached
        const { deck: updatedDeck, playerHand: newHand } = handleCardDealing(
          state,
          state.selectedCards,
        )
        const hasVowelsAfterWord = hasVowels(newHand)

        return {
          ...state,
          words: [
            ...state.words,
            { word: normalizedWord, type: validation.wordType },
          ],
          allWords: [
            ...state.allWords,
            { word: normalizedWord, type: validation.wordType },
          ],
          score: newScore,
          roundScore: newRoundScore,
          currentWord: '',
          selectedCards: [],
          deck: updatedDeck,
          playerHand: newHand,
          canReshuffle: !hasVowelsAfterWord,
        }
      } else {
        // In debug mode, just add the invalid word without dealing with cards
        if (state.debugMode) {
          return {
            ...state,
            invalidWords: [...state.invalidWords, normalizedWord],
            allWords: [...state.allWords, { word: normalizedWord }],
          }
        }

        // Normal mode - handle cards for invalid word
        const { deck: updatedDeckInvalid, playerHand: newHandInvalid } =
          handleCardDealing(state, state.selectedCards)
        const hasVowelsAfterInvalid = hasVowels(newHandInvalid)

        return {
          ...state,
          invalidWords: [...state.invalidWords, normalizedWord],
          allWords: [...state.allWords, { word: normalizedWord }],
          currentWord: '',
          selectedCards: [],
          deck: updatedDeckInvalid,
          playerHand: newHandInvalid,
          canReshuffle: !hasVowelsAfterInvalid,
        }
      }

    case 'END_ROUND':
      return {
        ...state,
        gameStatus: 'roundComplete',
      }

    case 'SHOW_ROUND_END':
      return {
        ...state,
        gameStatus: 'roundEnd',
      }

    case 'START_NEXT_ROUND':
      if (state.currentRound >= 3) {
        return {
          ...state,
          gameStatus: 'gameOver',
        }
      }
      const nextDeck = shuffleArray(createDeck())
      const nextHand = dealCards(nextDeck, 10)
      const hasVowelsNextRound = hasVowels(nextHand.dealtCards)

      return {
        ...state,
        gameStatus: 'playing',
        currentRound: state.currentRound + 1,
        words: [],
        invalidWords: [],
        roundScore: 0,
        targetScore: state.targetScore + TARGET_SCORE_INCREMENT,
        legendaryLetterPlayed: null, // Reset legendary letter for new round
        deck: nextHand.remainingDeck,
        playerHand: nextHand.dealtCards,
        canReshuffle: !hasVowelsNextRound,
        discardsUsed: 0, // Reset discards for new round
      }

    case 'PLAY_AGAIN':
      return initialState

    case 'TOGGLE_DEBUG':
      return {
        ...state,
        debugMode: !state.debugMode,
      }

    case 'CLEAR_NEW_FLAGS':
      return {
        ...state,
        playerHand: state.playerHand.map(card => ({ ...card, isNew: false })),
      }

    case 'ADD_LETTER':
      const { letter, cardIndex } = action.payload
      // Only add letter if it hasn't been used and no legendary letter has been played
      if (!state.selectedCards.includes(cardIndex)) {
        // Check if current word already has a legendary letter
        const hasLegendaryLetter =
          state.currentWord.includes('!') || state.currentWord.includes('?')
        if (hasLegendaryLetter) {
          return state // Prevent adding more letters after legendary
        }

        // If this is a legendary letter, set the flag
        if (letter === '!' || letter === '?') {
          return {
            ...state,
            currentWord: state.currentWord + letter,
            selectedCards: [...state.selectedCards, cardIndex],
            legendaryLetterPlayed: letter,
          }
        }
        return {
          ...state,
          currentWord: state.currentWord + letter,
          selectedCards: [...state.selectedCards, cardIndex],
        }
      }
      return state

    case 'REMOVE_LETTER':
      return {
        ...state,
        currentWord: state.currentWord.slice(0, -1),
        selectedCards: state.selectedCards.slice(0, -1),
      }

    case 'CLEAR_WORD':
      return {
        ...state,
        currentWord: '',
        selectedCards: [],
      }

    case 'DISCARD_CARDS':
      // Check discard limits and round target
      if (
        state.discardsUsed >= MAX_DISCARDS_PER_ROUND ||
        state.selectedCards.length > MAX_LETTERS_PER_DISCARD ||
        state.roundScore >= state.targetScore
      ) {
        return state
      }

      const { deck: discardDeck, playerHand: discardHand } = handleCardDealing(
        state,
        state.selectedCards,
      )
      const hasVowelsAfterDiscard = hasVowels(discardHand)

      return {
        ...state,
        deck: discardDeck,
        playerHand: discardHand,
        selectedCards: [],
        currentWord: '',
        canReshuffle: !hasVowelsAfterDiscard,
        discardsUsed: state.discardsUsed + 1,
      }

    case 'RESHUFFLE_HAND':
      // Don't allow reshuffle if round target is reached
      if (state.roundScore >= state.targetScore) {
        return state
      }

      // Only shuffle the cards in hand
      const shuffledHand = shuffleArray([...state.playerHand])

      return {
        ...state,
        playerHand: shuffledHand,
        selectedCards: [],
        currentWord: '',
      }

    case 'RESHUFFLE_DECK':
      // Don't allow reshuffle if round target is reached
      if (state.roundScore >= state.targetScore) {
        return state
      }

      // Create a new shuffled deck with all cards
      const reshuffledDeck = shuffleArray([...state.deck, ...state.playerHand])
      const reshuffledHand = dealCards(reshuffledDeck, 10)
      const hasVowelsAfterReshuffle = hasVowels(reshuffledHand.dealtCards)

      return {
        ...state,
        deck: reshuffledHand.remainingDeck,
        playerHand: reshuffledHand.dealtCards,
        canReshuffle: !hasVowelsAfterReshuffle,
        selectedCards: [],
        currentWord: '',
      }

    default:
      return state
  }
}

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  // Auto-start game if initial status is 'playing'
  React.useEffect(() => {
    if (INITIAL_GAME_STATUS === 'playing') {
      dispatch({ type: 'START_GAME' })
    }
  }, [])
  const { validateWord } = useWordValidation({
    minWordLength: initialState.minWordLength,
    maxWordLength: initialState.maxWordLength,
  })

  const addWord = useCallback(
    async word => {
      const validation = await validateWord(word)
      dispatch({
        type: 'ADD_WORD',
        payload: {
          word: word.toLowerCase(),
          isValid: validation.isValid,
          validation, // Pass the full validation result for word type
        },
      })
      return validation
    },
    [validateWord],
  )

  const value = {
    ...state,
    startGame: () => dispatch({ type: 'START_GAME' }),
    addWord,
    toggleDebug: () => dispatch({ type: 'TOGGLE_DEBUG' }),
    addLetter: (letter, cardIndex) =>
      dispatch({ type: 'ADD_LETTER', payload: { letter, cardIndex } }),
    removeLetter: () => dispatch({ type: 'REMOVE_LETTER' }),
    clearWord: () => dispatch({ type: 'CLEAR_WORD' }),
    endRound: () => dispatch({ type: 'END_ROUND' }),
    showRoundEnd: () => dispatch({ type: 'SHOW_ROUND_END' }),
    startNextRound: () => dispatch({ type: 'START_NEXT_ROUND' }),
    playAgain: () => dispatch({ type: 'PLAY_AGAIN' }),
    discardCards: () => dispatch({ type: 'DISCARD_CARDS' }),
    reshuffleHand: () => dispatch({ type: 'RESHUFFLE_HAND' }),
    reshuffleDeck: () => dispatch({ type: 'RESHUFFLE_DECK' }),
    clearNewFlags: () => dispatch({ type: 'CLEAR_NEW_FLAGS' }),
    // Expose deck and hand for components
    deck: state.deck,
    playerHand: state.playerHand,
    canReshuffle: state.canReshuffle,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
