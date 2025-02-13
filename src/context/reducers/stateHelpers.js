import { GAME_STATUS, WORD_LENGTH, INITIAL_GAME_STATUS, INITIAL_TARGET_SCORE, MAX_HAND_SIZE } from '../../constants/gameConstants'
import { createDeck } from '../../utils/cardUtils'
import { handleNewRound } from './gameHelpers'

const STORAGE_KEY = 'wordGameState'

export const getStoredState = () => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY)
    if (storedState) {
      const state = JSON.parse(storedState)
      // Reset current word state and selections
      state.wordHistory = {
        ...state.wordHistory,
        current: {
          ...state.wordHistory.current,
          text: '',
          selectedIndices: [],
        }
      }
      
      // If we're in a playing state but have no cards, deal new ones
      if (state.gameStatus === GAME_STATUS.PLAYING && state.playerHand.length === 0) {
        const { deck, playerHand, canReshuffle } = handleNewRound(createDeck())
        return {
          ...state,
          deck,
          playerHand,
          canReshuffle,
        }
      }
      return state
    }
  } catch (error) {
    console.error('Failed to load stored game state:', error)
  }
  return null
}

export const getDefaultState = () => {
  const { deck, playerHand, canReshuffle } = handleNewRound(createDeck())
  return {
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
    playsUsed: 0,

    // Word tracking
    wordHistory: {
      valid: [],
      invalid: [],
      all: [],
      current: {
        text: '',
        selectedIndices: [],
        hasLegendaryLetter: false,
      },
    },

    // Card management
    deck,
    playerHand,
    canReshuffle,
    discardsUsed: 0,
    legendaryLetterPlayed: null,
  }
}

export const getInitialState = () => {
  const storedState = getStoredState()
  return storedState || getDefaultState()
}