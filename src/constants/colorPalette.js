/**
 * Shared color palette for consistent styling across the application
 */
export const COLOR_PALETTE = {
  LEGENDARY: 'bg-orange-500 text-white',
  EPIC: 'bg-purple-500 text-white',
  RARE: 'bg-blue-500 text-white',
  UNCOMMON: 'bg-green-500 text-white',
  COMMON: 'bg-white',
  DEFAULT: 'bg-gray-500 text-white',
  SELECTED: 'bg-gray-400 text-white',
  DISGUSTING: 'bg-amber-700 text-white',
}

export const WORD_TYPE_COLORS = {
  noun: COLOR_PALETTE.COMMON,
  verb: COLOR_PALETTE.UNCOMMON,
  adjective: COLOR_PALETTE.RARE,
  adverb: COLOR_PALETTE.EPIC,
  preposition: COLOR_PALETTE.EPIC,
  pronoun: COLOR_PALETTE.EPIC,
  conjunction: COLOR_PALETTE.EPIC,
  interjection: COLOR_PALETTE.EPIC,
  unknown: COLOR_PALETTE.DEFAULT,
}
