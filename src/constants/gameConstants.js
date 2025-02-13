/**
 * Core game configuration settings
 */

// Game states
export const GAME_STATUS = {
  WELCOME: 'welcome',
  PLAYING: 'playing',
  PAUSED: 'paused',
  ROUND_COMPLETE: 'roundComplete',
  ROUND_END: 'roundEnd',
  GAME_OVER: 'gameOver',
  VALIDATING: 'validating',
}

// Initial game state
export const INITIAL_GAME_STATUS = GAME_STATUS.PLAYING

// Game mechanics
export const MAX_HAND_SIZE = 9
export const LEGENDARY_LETTERS = {
  WILD: '!',
  SPECIAL: '?',
}

// Target scores
export const INITIAL_TARGET_SCORE = 25000
export const TARGET_SCORE_INCREMENT = 10000

// Game limits
export const MAX_DISCARDS_PER_ROUND = 9
export const MAX_PLAYS_PER_ROUND = 5

// Action types
export const ACTION_TYPES = {
  START_GAME: 'START_GAME',
  ADD_WORD: 'ADD_WORD',
  END_ROUND: 'END_ROUND',
  SHOW_ROUND_END: 'SHOW_ROUND_END',
  START_NEXT_ROUND: 'START_NEXT_ROUND',
  PLAY_AGAIN: 'PLAY_AGAIN',
  TOGGLE_DEBUG: 'TOGGLE_DEBUG',
  ADD_LETTER: 'ADD_LETTER',
  REMOVE_LETTER: 'REMOVE_LETTER',
  CLEAR_WORD: 'CLEAR_WORD',
  DISCARD_CARDS: 'DISCARD_CARDS',
  RESHUFFLE_HAND: 'RESHUFFLE_HAND',
  RESHUFFLE_DECK: 'RESHUFFLE_DECK',
  CLEAR_NEW_FLAGS: 'CLEAR_NEW_FLAGS',
  REORDER_HAND: 'REORDER_HAND',
}

export const ERROR_MESSAGES = {
  NOT_ENOUGH_CARDS: 'Not enough cards in deck',
  DICTIONARY_VALIDATION_FAILED: 'Dictionary validation failed',
  WORD_NOT_FOUND: 'Word not found in dictionary',
}

export const WORD_LENGTH = {
  MIN: 3,
  MAX: 15
}
