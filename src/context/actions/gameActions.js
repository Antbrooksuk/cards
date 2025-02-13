import { ACTION_TYPES } from '../../constants/gameConstants'

export const createGameActions = (safeDispatch, validateWord) => ({
  startGame: () => safeDispatch({ type: ACTION_TYPES.START_GAME }),
  toggleDebug: () => safeDispatch({ type: ACTION_TYPES.TOGGLE_DEBUG }),
  addLetter: (letter, cardIndex) => {
    safeDispatch({
      type: ACTION_TYPES.ADD_LETTER,
      payload: { letter, cardIndex },
    })
  },
  removeLetter: () => safeDispatch({ type: ACTION_TYPES.REMOVE_LETTER }),
  clearWord: () => safeDispatch({ type: ACTION_TYPES.CLEAR_WORD }),
  endRound: () => safeDispatch({ type: ACTION_TYPES.END_ROUND }),
  showRoundEnd: () => safeDispatch({ type: ACTION_TYPES.SHOW_ROUND_END }),
  startNextRound: () => safeDispatch({ type: ACTION_TYPES.START_NEXT_ROUND }),
  playAgain: () => safeDispatch({ type: ACTION_TYPES.PLAY_AGAIN }),
  discardCards: () => safeDispatch({ type: ACTION_TYPES.DISCARD_CARDS }),
  reshuffleHand: () => safeDispatch({ type: ACTION_TYPES.RESHUFFLE_HAND }),
  reshuffleDeck: () => safeDispatch({ type: ACTION_TYPES.RESHUFFLE_DECK }),
  clearNewFlags: () => safeDispatch({ type: ACTION_TYPES.CLEAR_NEW_FLAGS }),
  reorderHand: (fromIndex, toIndex) =>
    safeDispatch({
      type: ACTION_TYPES.REORDER_HAND,
      payload: { fromIndex, toIndex },
    }),
  addWord: async word => {
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
      return { isValid: false, error: err.message }
    }
  },
})