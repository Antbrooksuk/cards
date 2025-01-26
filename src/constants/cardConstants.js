/**
 * Card types and scoring constants
 */
export const CARD_TYPE = {
  LEGENDARY: 'LEGENDARY',
  EPIC: 'EPIC',
  RARE: 'RARE',
  UNCOMMON: 'UNCOMMON',
  VOWEL: 'VOWEL',
}

export const CARD_SCORES = {
  VOWEL: 50,
  UNCOMMON: 100,
  RARE: 200,
  EPIC: 500,
  LEGENDARY: 0,
}

/**
 * Letter categories
 */
export const LEGENDARY_LETTERS = ['!', '?']
export const EPIC_CONSONANTS = ['Q', 'Z', 'Z', 'Z', 'X', 'X', 'J']
export const RARE_CONSONANTS = ['B', 'C', 'F', 'G', 'K', 'P', 'V', 'W', 'Y']
export const UNCOMMON_CONSONANTS = ['L', 'D', 'M', 'H', 'R', 'T', 'N', 'S']
export const VOWELS = ['A', 'E', 'I', 'O', 'U']

/**
 * Animation states and timing
 */
export const ANIMATION_STATE = {
  NONE: 'NONE',
  ENTERING_WORD: 'ENTERING_WORD',
  EXITING_WORD: 'EXITING_WORD',
}

export const ANIMATION_CONSTANTS = {
  BASE_DURATION: 300, // ms - base duration for transitions
  CARD_ANIMATION_DURATION: 500, // ms - duration for card animations
  STAGGER_DELAY: 150, // ms - delay between staggered animations
  UNDEAL_DELAY_BUFFER: 500, // ms - additional delay after undealing
}

export const ANIMATION_TIMING = {
  CARD_STAGGER_DELAY: ANIMATION_CONSTANTS.STAGGER_DELAY,
  CARD_ANIMATION_DURATION: ANIMATION_CONSTANTS.CARD_ANIMATION_DURATION,
  UNDEAL_DELAY_BUFFER: ANIMATION_CONSTANTS.UNDEAL_DELAY_BUFFER,
}

export const CARD_ANIMATION = {
  WORD_CARD_SCALE: 1,
  DRAGGED_CARD_OPACITY: 0.8,
}

/**
 * Deck configuration
 */
export const DECK_CONFIG = {
  LEGENDARY_SETS: 1, // set of legendary letters
  EPIC_CONSONANTS_SETS: 1, // sets of epic consonants
  RARE_CONSONANTS_SETS: 2, // sets of rare consonants
  UNCOMMON_CONSONANTS_SETS: 6, // sets of uncommon consonants
  VOWEL_SETS: 10, // sets of vowels
}
