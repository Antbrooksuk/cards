import { ANIMATION_CONSTANTS } from './cardConstants'

export const CARD_CLASSES = {
  base: `border border-[2px] border-[rgba(0,0,0,0.25)] w-14 h-[4.5rem] rounded-lg shadow-[0px_3px_4px_1px_rgba(0,_0,_0,_0.2)] transform transition-all duration-${ANIMATION_CONSTANTS.BASE_DURATION}`,
  inner: {
    base: ' w-full h-full rounded-[4px] shadow-inner flex items-center justify-center font-bold text-xl',
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
