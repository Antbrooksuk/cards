import { COLOR_PALETTE } from './colorPalette'

/**
 * Card styling and layout constants
 */
export const CARD_STYLES = {
  SELECTED: COLOR_PALETTE.SELECTED,
  LEGENDARY: COLOR_PALETTE.LEGENDARY,
  EPIC: COLOR_PALETTE.EPIC,
  UNCOMMON: COLOR_PALETTE.UNCOMMON,
  RARE: COLOR_PALETTE.RARE,
  VOWEL: COLOR_PALETTE.COMMON,
  DEFAULT: COLOR_PALETTE.DEFAULT,
}

export const CARD_ANIMATION = {
  BASE: 'transform transition-all duration-300',
  DEAL: 'animate-dealCard',
  NEW: 'opacity-0',
  EXIT: 'opacity-0 -translate-y-full rotate-180 scale-0',
}

export const CARD_LAYOUT = {
  CONTAINER: 'w-16 h-20 rounded-lg shadow-md flex items-center justify-center',
  CONTENT: 'relative w-full h-full flex flex-col items-center justify-center',
  ID: 'text-xs absolute top-1 left-1 opacity-50',
  LETTER: 'text-2xl',
  SCORE: 'text-xs absolute bottom-1 right-1 opacity-75',
}

export const MINI_CARD_LAYOUT = {
  CONTAINER:
    'font-bold w-8 h-10 rounded shadow-sm flex items-center justify-center',
  CONTENT: 'relative w-full h-full flex flex-col items-center justify-center',
  LETTER: 'text-lg',
  SCORE: 'text-[10px] absolute bottom-0.5 right-0.5 opacity-75',
}

/**
 * Card types and scoring
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
