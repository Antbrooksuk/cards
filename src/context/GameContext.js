import React, { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react'
import useWordValidation from '../hooks/useWordValidation'
import { gameReducer } from './reducers/gameReducer'
import { getInitialState } from './reducers/stateHelpers'
import { createGameActions } from './actions/gameActions'

const STORAGE_KEY = 'wordGameState'
const GameContext = createContext()

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, getInitialState())
  const [error, setError] = React.useState(null)

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save game state:', error)
    }
  }, [state])

  // Clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const { validateWord } = useWordValidation({
    minWordLength: state.minWordLength,
    maxWordLength: state.maxWordLength,
  })

  const safeDispatch = useCallback(action => {
    try {
      console.log('Dispatching action:', action)
      dispatch(action)
    } catch (err) {
      console.error('Game action error:', err)
      setError(err.message)
    }
  }, [])

  const gameActions = useMemo(
    () => createGameActions(safeDispatch, validateWord),
    [safeDispatch, validateWord]
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
      allWords: state.wordHistory.all,
      // Actions
      ...gameActions,
      // Expose deck and hand for components
      deck: state.deck,
      playerHand: state.playerHand,
      canReshuffle: state.canReshuffle,
    }),
    [state, error, gameActions]
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
