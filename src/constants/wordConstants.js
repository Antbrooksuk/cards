import { CARD_COLORS, THEME_COLORS } from './tailwindClasses'

/**
 * Word length constraints and categories
 */
export const WORD_LENGTH = {
  MIN: 2,
  MAX: 9,
  LEGENDARY_MIN: 9,
  LEGENDARY_MAX: 9,
  EPIC_MIN: 7,
  EPIC_MAX: 8,
  RARE_MIN: 5,
  RARE_MAX: 6,
  UNCOMMON_MIN: 3,
  UNCOMMON_MAX: 4,
  COMMON_MIN: 2,
  COMMON_MAX: 2,
}

export const WORD_LENGTH_CLASSES = {
  LEGENDARY: CARD_COLORS.legendary,
  EPIC: CARD_COLORS.epic,
  RARE: CARD_COLORS.rare,
  UNCOMMON: CARD_COLORS.uncommon,
  COMMON: CARD_COLORS.common,
}

/**
 * Word type scoring multipliers
 */
export const WORD_TYPE_MULTIPLIER = {
  noun: 2,
  verb: 3,
  adjective: 4,
  adverb: 6,
  preposition: 6,
  pronoun: 6,
  conjunction: 6,
  interjection: 6,
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
  COLOR: THEME_COLORS.disgusting,
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
  COLOR: THEME_COLORS.genz,
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
  COLOR: THEME_COLORS.millennial,
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
  COLOR: THEME_COLORS.tech,
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
  COLOR: THEME_COLORS.food,
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
  COLOR: THEME_COLORS.nature,
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
  COLOR: THEME_COLORS.retro,
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
  COLOR: THEME_COLORS.internet,
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
  'NUDE',
  'NUDIST',
  'SAUCY',
  'ROMP',
  'FLIRT',
  'THIGH',
  'BREAST',
  'GROAN',
]

export const LOVE_WORD_STYLE = {
  COLOR: THEME_COLORS.love,
  MULTIPLIER: 1.5, // Increases score by 75%
}
