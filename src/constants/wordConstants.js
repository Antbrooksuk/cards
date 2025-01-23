import { COLOR_PALETTE, WORD_TYPE_COLORS } from './colorPalette'

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
  MULTIPLIER: 1.5, // Reduces score by half
}

/**
 * GenZ slang words
 */
export const GENZ_WORDS = [
  'CAP',
  'BET',
  'DRIP',
  'BASIC',
  'SALTY',
  'CANCELLED',
  'CLAPBACK',
  'DANK',
  'GOAT',
  'LOWKEY',
  'SNACK',
  'SNATCHED',
  'GHOSTED',
]

export const GENZ_WORD_STYLE = {
  COLOR: COLOR_PALETTE.GENZ,
  MULTIPLIER: 1.5, // Increases score by 50%
}

/**
 * Millennial slang words
 */
export const MILLENNIAL_WORDS = [
  'ADULTING',
  'BAE',
  'BASIC',
  'HUMBLEBRAG',
  'EXTRA',
  'FAM',
  'LIT',
  'RECEIPTS',
  'SAVAGE',
  'SHOOK',
  'SLAY',
  'SUS',
  'THIRSTY',
  'SHADE',
  'TRILL',
]

export const MILLENNIAL_WORD_STYLE = {
  COLOR: COLOR_PALETTE.MILLENNIAL,
  MULTIPLIER: 1.5, // Increases score by 25%
}

/**
 * Tech-related words
 */
export const TECH_WORDS = [
  'BLOCKCHAIN',
  'CRYPTO',
  'CLOUD',
  'PIXEL',
  'ROUTER',
  'BROWSER',
  'COOKIE',
  'VIRAL',
  'BUFFER',
  'CACHE',
]

export const TECH_WORD_STYLE = {
  COLOR: COLOR_PALETTE.TECH,
  MULTIPLIER: 1.5, // Increases score by 75%
}

/**
 * Food-related words
 */
export const FOOD_WORDS = [
  'UMAMI',
  'SPICY',
  'ZESTY',
  'CRISP',
  'FRESH',
  'TASTY',
  'SWEET',
  'SALTY',
  'BLAND',
]

export const FOOD_WORD_STYLE = {
  COLOR: COLOR_PALETTE.FOOD,
  MULTIPLIER: 1.5, // Increases score by 25%
}

/**
 * Nature-related words
 */
export const NATURE_WORDS = [
  'BLOOM',
  'STORM',
  'FROST',
  'RIVER',
  'CLOUD',
  'GRASS',
  'LEAF',
  'WIND',
  'RAIN',
]

export const NATURE_WORD_STYLE = {
  COLOR: COLOR_PALETTE.NATURE,
  MULTIPLIER: 1.5, // Increases score by 50%
}

/**
 * Retro slang words
 */
export const RETRO_WORDS = [
  'GROOVY',
  'RADICAL',
  'TUBULAR',
  'GNARLY',
  'WICKED',
  'BOGUS',
  'FAR_OUT',
]

export const RETRO_WORD_STYLE = {
  COLOR: COLOR_PALETTE.RETRO,
  MULTIPLIER: 1.5, // Doubles the score
}

/**
 * Internet culture words
 */
export const INTERNET_WORDS = [
  'MEME',
  'VIRAL',
  'TWEET',
  'BLOG',
  'PING',
  'SPAM',
  'TROLL',
  'FLAME',
]

export const INTERNET_WORD_STYLE = {
  COLOR: COLOR_PALETTE.INTERNET,
  MULTIPLIER: 1.5, // Increases score by 50%
}

/**
 * Love-related words
 */
export const LOVE_WORDS = [
  'HEART',
  'SWEET',
  'KISS',
  'HUG',
  'LOVE',
  'DEAR',
  'HONEY',
  'CUTE',
  'ADORE',
]

export const LOVE_WORD_STYLE = {
  COLOR: COLOR_PALETTE.LOVE,
  MULTIPLIER: 1.5, // Increases score by 75%
}
