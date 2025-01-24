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
 * Animation timing
 */
export const ANIMATION_TIMING = {
  CARD_STAGGER_DELAY: 100, // ms between each card animation
  CARD_ANIMATION_DURATION: 500, // total animation duration for cards
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
