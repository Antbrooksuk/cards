import { COLOR_PALETTE } from './colorPalette'
import { WORD_TYPE_COLORS } from './colorPalette'

/**
 * Word length constraints and categories
 */
export const WORD_LENGTH = {
  MIN: 2,
  MAX: 15,
  LEGENDARY: 10,
  EPIC: 9,
  RARE_MIN: 6,
  RARE_MAX: 8,
  UNCOMMON_MIN: 4,
  UNCOMMON_MAX: 5,
  COMMON_MIN: 2,
  COMMON_MAX: 3,
}

export const WORD_LENGTH_CLASSES = {
  LEGENDARY: COLOR_PALETTE.LEGENDARY,
  EPIC: COLOR_PALETTE.EPIC,
  RARE: COLOR_PALETTE.RARE,
  UNCOMMON: COLOR_PALETTE.UNCOMMON,
  COMMON: COLOR_PALETTE.COMMON,
}

/**
 * Word type scoring multipliers
 */
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

/**
 * Special word categories
 */
export const DISGUSTING_WORDS = [
  'MOIST',
  'PHLEGM',
  'MUCUS',
  'OOZE',
  'PUSS',
  'SLIME',
  'GUNK',
  'SLUDGE',
  'SQUIRT',
  'DROOL',
  'DAMP',
  'CRUST',
  'SEEP',
]

export const DISGUSTING_WORD_STYLE = {
  COLOR: COLOR_PALETTE.DISGUSTING,
  MULTIPLIER: 0.5, // Reduces score by half
}
