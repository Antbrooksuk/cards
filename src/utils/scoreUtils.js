import { CARD_SCORES } from '../constants/cardConstants'
import { getLetterType } from './cardUtils'
import { WORD_TYPE_COLORS } from '../constants/tailwindClasses'
import {
  WORD_TYPE_MULTIPLIER,
  DISGUSTING_WORDS,
  DISGUSTING_WORD_STYLE,
  GENZ_WORDS,
  GENZ_WORD_STYLE,
  MILLENNIAL_WORDS,
  MILLENNIAL_WORD_STYLE,
  TECH_WORDS,
  TECH_WORD_STYLE,
  FOOD_WORDS,
  FOOD_WORD_STYLE,
  NATURE_WORDS,
  NATURE_WORD_STYLE,
  RETRO_WORDS,
  RETRO_WORD_STYLE,
  INTERNET_WORDS,
  INTERNET_WORD_STYLE,
  LOVE_WORDS,
  LOVE_WORD_STYLE,
} from '../constants/wordConstants'

/**
 * Get the style for a word type
 * @param {string} type - The word type
 * @param {boolean} isInvalid - Whether the word is invalid
 * @returns {string} The CSS class for the word type
 */
export const getWordTypeStyle = (type, isInvalid) => {
  return isInvalid
    ? 'text-red-600'
    : WORD_TYPE_COLORS[type?.toLowerCase() || 'unknown']
}

/**
 * Get special word bonus information
 * @param {Object} wordScoreResult - The result from calculateWordTotalScore
 * @returns {Object|null} Bonus information or null if no bonus applies
 */
export const getSpecialWordBonus = wordScoreResult => {
  if (!wordScoreResult) return null

  const {
    isDisgusting,
    isGenZ,
    isMillennial,
    isTech,
    isFood,
    isNature,
    isRetro,
    isInternet,
    isLove,
  } = wordScoreResult

  if (isDisgusting) {
    return {
      style: DISGUSTING_WORD_STYLE,
      text: 'EW!',
      multiplier: DISGUSTING_WORD_STYLE.MULTIPLIER,
    }
  } else if (isGenZ) {
    return {
      style: GENZ_WORD_STYLE,
      text: 'GENZ!',
      multiplier: GENZ_WORD_STYLE.MULTIPLIER,
    }
  } else if (isMillennial) {
    return {
      style: MILLENNIAL_WORD_STYLE,
      text: 'MILLENNIALS RULE!',
      multiplier: MILLENNIAL_WORD_STYLE.MULTIPLIER,
    }
  } else if (isTech) {
    return {
      style: TECH_WORD_STYLE,
      text: 'TECH!',
      multiplier: TECH_WORD_STYLE.MULTIPLIER,
    }
  } else if (isFood) {
    return {
      style: FOOD_WORD_STYLE,
      text: 'YUMMY!',
      multiplier: FOOD_WORD_STYLE.MULTIPLIER,
    }
  } else if (isNature) {
    return {
      style: NATURE_WORD_STYLE,
      text: 'NATURE!',
      multiplier: NATURE_WORD_STYLE.MULTIPLIER,
    }
  } else if (isRetro) {
    return {
      style: RETRO_WORD_STYLE,
      text: 'GROOVY!',
      multiplier: RETRO_WORD_STYLE.MULTIPLIER,
    }
  } else if (isInternet) {
    return {
      style: INTERNET_WORD_STYLE,
      text: 'VIRAL!',
      multiplier: INTERNET_WORD_STYLE.MULTIPLIER,
    }
  } else if (isLove) {
    return {
      style: LOVE_WORD_STYLE,
      text: 'MWAH!',
      multiplier: LOVE_WORD_STYLE.MULTIPLIER,
    }
  }

  return null
}

/**
 * Get score multipliers for a word
 * @param {string} word - The word
 * @param {string} type - The word type
 * @returns {Object} Object containing multiplier information
 */
export const getScoreMultipliers = (word, type) => {
  return {
    length: word.length,
    type: WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown'],
  }
}

/**
 * Calculate score for a single letter
 * @param {string} letter - The letter to score
 * @returns {number} The score for the letter
 */
export const calculateLetterScore = letter => {
  const type = getLetterType(letter)
  return CARD_SCORES[type] || 0
}

/**
 * Calculate the total score for all letters in a word
 * @param {string} word - The word to calculate letter scores for
 * @returns {number} The total score of all letters
 */
export const calculateWordLettersScore = word => {
  let score = 0
  for (let i = 0; i < word.length; i++) {
    score += calculateLetterScore(word[i])
  }
  return score
}

/**
 * Check if a word is disgusting
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the disgusting words list
 */
export const isDisgustingWord = word => {
  return DISGUSTING_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is GenZ slang
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the GenZ words list
 */
export const isGenZWord = word => {
  return GENZ_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is Millennial slang
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the Millennial words list
 */
export const isMillennialWord = word => {
  return MILLENNIAL_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is tech-related
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the tech words list
 */
export const isTechWord = word => {
  return TECH_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is food-related
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the food words list
 */
export const isFoodWord = word => {
  return FOOD_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is nature-related
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the nature words list
 */
export const isNatureWord = word => {
  return NATURE_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is retro slang
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the retro words list
 */
export const isRetroWord = word => {
  return RETRO_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is internet-related
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the internet words list
 */
export const isInternetWord = word => {
  return INTERNET_WORDS.includes(word.toUpperCase())
}

/**
 * Check if a word is love-related
 * @param {string} word - The word to check
 * @returns {boolean} True if the word is in the love words list
 */
export const isLoveWord = word => {
  return LOVE_WORDS.includes(word.toUpperCase())
}

/**
 * Calculate total score for a word including type multiplier and length bonus
 * @param {string} word - The word to score
 * @param {string} wordType - The type of word (noun, verb, etc.)
 * @returns {Object} Object containing score and whether word is disgusting
 */
export const calculateWordTotalScore = (word, wordType) => {
  // Calculate base score from letters
  const letterScore = calculateWordLettersScore(word)

  // Apply word type multiplier and word length
  const { length, type: typeMultiplier } = getScoreMultipliers(word, wordType)
  const score = letterScore * typeMultiplier * length

  // Check word categories and apply modifiers
  const isDisgusting = isDisgustingWord(word)
  const isGenZ = isGenZWord(word)
  const isMillennial = isMillennialWord(word)
  const isTech = isTechWord(word)
  const isFood = isFoodWord(word)
  const isNature = isNatureWord(word)
  const isRetro = isRetroWord(word)
  const isInternet = isInternetWord(word)
  const isLove = isLoveWord(word)

  const specialBonus = getSpecialWordBonus({
    isDisgusting,
    isGenZ,
    isMillennial,
    isTech,
    isFood,
    isNature,
    isRetro,
    isInternet,
    isLove,
  })

  const finalScore = specialBonus ? score * specialBonus.multiplier : score

  return {
    score: finalScore,
    isDisgusting,
    isGenZ,
    isMillennial,
    isTech,
    isFood,
    isNature,
    isRetro,
    isInternet,
    isLove,
  }
}

/**
 * Calculate the total score for a round
 * @param {Array<{word: string, type: string}>} words - Array of word objects played in the round
 * @returns {number} The total score for the round
 */
export const calculateRoundScore = words => {
  return words.reduce((total, { word, type }) => {
    const { score } = calculateWordTotalScore(word, type)
    return total + score
  }, 0)
}

/**
 * Calculate the total score across all rounds
 * @param {Array<Array<{word: string, type: string}>>} rounds - Array of rounds, each containing word objects
 * @returns {number} The total score across all rounds
 */
export const calculateTotalScore = rounds => {
  return rounds.reduce((total, round) => {
    return total + calculateRoundScore(round)
  }, 0)
}
