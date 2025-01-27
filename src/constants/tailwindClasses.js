import { ANIMATION_CONSTANTS } from './cardConstants'

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
  primary: 'bg-blue-500 text-white',
  secondary: 'bg-gray-500 text-white',
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
export const ANIMATION_CLASSES = {
  base: `transition-all duration-${ANIMATION_CONSTANTS.BASE_DURATION}`,
  instant: '!duration-0',
  positioned: 'transform !duration-0', // For positioned elements that shouldn't animate
}

export const CARD_CLASSES = {
  base: `border border-gray-500 w-14 h-[4.5rem] rounded-lg shadow-[0px_2px_5px_1px_rgba(0,_0,_0,_0.2)] transform ${ANIMATION_CLASSES.base}`,
  inner: {
    base: ' w-full h-full rounded-md shadow-inner flex items-center justify-center font-bold text-xl',
    legendary: 'bg-orange-100 text-orange-900',
    epic: 'bg-purple-100 text-purple-900',
    rare: 'bg-blue-100 text-blue-900',
    uncommon: 'bg-green-100 text-green-900',
    vowel: 'bg-white text-gray-800',
    default: 'bg-gray-100 text-gray-800',
    selected: 'bg-gray-100 text-gray-900',
  },
  content: 'relative w-full h-full flex flex-col items-center justify-center',
  id: 'text-[0.6rem] absolute top-1 left-1 opacity-50',
  letter: 'text-4xl',
  score: 'text-[0.6rem] absolute top-0.5 left-0.5 opacity-75 leading-none',
  animation: {
    deal: 'animate-dealCard scale-100',
    new: 'opacity-0 scale-75',
    exit: 'opacity-0 -translate-y-16 rotate-180 scale-0',
  },
}

export const MINI_CARD_CLASSES = {
  base: 'w-8 h-10 rounded p-0.5 shadow-md',
  inner: {
    base: 'w-full h-full rounded shadow-inner flex items-center justify-center font-bold',
    legendary: 'bg-orange-50 text-orange-900',
    epic: 'bg-purple-50 text-purple-900',
    rare: 'bg-blue-50 text-blue-900',
    uncommon: 'bg-green-50 text-green-900',
    vowel: 'bg-white text-gray-800',
    default: 'bg-gray-50 text-gray-800',
    selected: 'bg-gray-100 text-gray-900',
  },
  content: 'relative w-full h-full flex flex-col items-center justify-center',
  letter: 'text-xl',
  score: 'text-[10px] absolute bottom-0.5 right-0.5 opacity-75',
}

/**
 * Color palette for consistent styling across the application
 */
export const CARD_COLORS = {
  legendary: 'bg-gradient-to-tr from-orange-500 to-red-500',
  epic: 'bg-gradient-to-tr from-purple-500 to-pink-500',
  rare: 'bg-gradient-to-tr from-blue-500 to-purple-500',
  uncommon: 'bg-gradient-to-tr from-green-500 to-teal-500',
  common: 'bg-gradient-to-tr from-sky-200 to-pink-200',
  default: 'bg-gradient-to-tr from-gray-400 to-gray-500',
  selected: 'bg-gradient-to-tr from-gray-500 to-gray-600',
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
