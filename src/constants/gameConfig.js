/**
 * Game configuration constants
 */

// Word length constraints
export const MIN_WORD_LENGTH = 2
export const MAX_WORD_LENGTH = 15

// Letter scores
export const VOWEL_SCORE = 50
export const UNCOMMON_SCORE = 100
export const RARE_SCORE = 200
export const EPIC_SCORE = 500
export const LEGENDARY_SCORE = 0

// Card types
export const CARD_TYPE = {
  LEGENDARY: 'legendary',
  EPIC: 'epic',
  UNCOMMON: 'uncommon',
  RARE: 'rare',
  VOWEL: 'vowel',
}

// Letters
export const LEGENDARY_LETTERS = ['!', '?']
export const EPIC_CONSONANTS = ['Q', 'Z', 'X', 'J']
export const RARE_CONSONANTS = [
  'B',
  'C',
  'D',
  'F',
  'G',
  'H',
  'K',
  'L',
  'M',
  'P',
  'V',
  'W',
  'Y',
]
export const UNCOMMON_CONSONANTS = ['R', 'T', 'N', 'S']
export const VOWELS = ['A', 'E', 'I', 'O', 'U']

// Deck configuration
export const LEGENDARY_SETS = 1 // set of legendary letters
export const EPIC_CONSONANTS_SETS = 2 // sets of epic consonants
export const RARE_CONSONANTS_SETS = 1 // sets of rare consonants
export const UNCOMMON_CONSONANTS_SETS = 9 // sets of uncommon consonants
export const VOWEL_SETS = 7 // sets of vowels

// Game state
export const INITIAL_GAME_STATUS = 'playing' // 'welcome' or 'playing'

// Target scores
export const INITIAL_TARGET_SCORE = 5000
export const TARGET_SCORE_INCREMENT = 2500

// Discard limits
export const MAX_DISCARDS_PER_ROUND = 2
export const MAX_LETTERS_PER_DISCARD = 5

// Word type colors
export const WORD_TYPE_COLORS = {
  noun: 'bg-white',
  verb: 'bg-green-100',
  adjective: 'bg-blue-100',
  adverb: 'bg-purple-100',
  preposition: 'bg-purple-100',
  pronoun: 'bg-purple-100',
  conjunction: 'bg-purple-100',
  interjection: 'bg-purple-100',
  unknown: 'bg-gray-500',
}

// Word type score multipliers
export const WORD_TYPE_MULTIPLIER = {
  noun: 2,
  verb: 4,
  adjective: 8,
  adverb: 16,
  preposition: 16,
  pronoun: 16,
  conjunction: 16,
  interjection: 16,
  unknown: 1,
}
