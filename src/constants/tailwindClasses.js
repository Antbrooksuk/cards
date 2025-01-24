/**
 * Tailwind CSS classes for layout patterns
 */
export const LAYOUT_CLASSES = {
  container: 'max-w-4xl mx-auto px-4',
  header: 'flex justify-between items-center mb-6',
  contentSection: 'space-y-4',
  flexRow: 'flex gap-4',
  flexBetween: 'flex justify-between items-center',
}

/**
 * Tailwind CSS classes for common UI elements
 */
export const UI_CLASSES = {
  panel: 'border bg-gray-100 rounded-lg min-h-[100px] w-full',
  spinner: 'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500',
  flexCenter: 'flex justify-center items-center',
  flexWrap: 'flex flex-wrap gap-4 justify-center items-center',
}

/**
 * Tailwind CSS classes for text styles
 */
export const TEXT_CLASSES = {
  heading: 'text-xl font-bold',
  label: 'text-sm font-medium text-gray-600',
  score: 'text-lg font-semibold',
}

/**
 * Tailwind CSS classes for interactive elements
 */
export const BUTTON_CLASSES = {
  base: 'px-4 py-2 rounded-lg font-semibold transition-colors',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  disabled: 'opacity-50 cursor-not-allowed',
}

/**
 * Tailwind CSS classes for input elements
 */
export const INPUT_CLASSES = {
  base: 'w-full p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500',
  error: 'border-red-500 focus:border-red-600',
  success: 'border-green-500 focus:border-green-600',
}

/**
 * Tailwind CSS classes for card components
 */
export const CARD_CLASSES = {
  base: 'w-14 h-[4.5rem] rounded-lg shadow-md flex items-center justify-center font-bold text-xl transform transition-all duration-300 hover:scale-110',
  content: 'relative w-full h-full flex flex-col items-center justify-center',
  id: 'text-[0.6rem] absolute top-1 left-1 opacity-50',
  letter: 'text-4xl',
  score: 'text-[0.75rem] absolute top-1 left-1 opacity-75 leading-none',
  animation: {
    deal: 'animate-dealCard scale-100',
    new: 'opacity-0 scale-75',
    exit: 'opacity-0 -translate-y-16 rotate-180 scale-0',
  },
}

export const MINI_CARD_CLASSES = {
  base: 'w-8 h-10 rounded shadow-sm flex items-center justify-center font-bold',
  content: 'relative w-full h-full flex flex-col items-center justify-center',
  letter: 'text-lg',
  score: 'text-[10px] absolute bottom-0.5 right-0.5 opacity-75',
}

/**
 * Color palette for consistent styling across the application
 */
export const CARD_COLORS = {
  legendary: 'bg-orange-500 text-white',
  epic: 'bg-purple-500 text-white',
  rare: 'bg-blue-500 text-white',
  uncommon: 'bg-green-500 text-white',
  common: 'bg-white',
  default: 'bg-gray-500 text-white',
  selected: 'bg-gray-400 text-white',
}

export const THEME_COLORS = {
  disgusting: 'bg-amber-700 text-white',
  genz: 'bg-pink-500 text-white',
  millennial: 'bg-cyan-500 text-white',
  tech: 'bg-indigo-500 text-white',
  food: 'bg-yellow-500 text-white',
  nature: 'bg-emerald-500 text-white',
  retro: 'bg-purple-400 text-white',
  internet: 'bg-blue-400 text-white',
  love: 'bg-rose-400 text-white',
}

export const WORD_TYPE_COLORS = {
  noun: CARD_COLORS.common,
  verb: CARD_COLORS.uncommon,
  adjective: CARD_COLORS.rare,
  adverb: CARD_COLORS.epic,
  preposition: CARD_COLORS.epic,
  pronoun: CARD_COLORS.epic,
  conjunction: CARD_COLORS.epic,
  interjection: CARD_COLORS.epic,
  unknown: CARD_COLORS.default,
}
