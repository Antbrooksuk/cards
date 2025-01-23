import {
  LEGENDARY_LETTERS,
  VOWELS,
  EPIC_CONSONANTS,
  UNCOMMON_CONSONANTS,
  RARE_CONSONANTS,
  CARD_SCORES,
} from '../constants/cardConstants'

import {
  WORD_TYPE_MULTIPLIER,
  DISGUSTING_WORDS,
  DISGUSTING_WORD_STYLE,
} from '../constants/wordConstants'

/**
 * Calculate score for a single letter
 * @param {string} letter - The letter to score
 * @returns {number} The score for the letter
 */
export const calculateLetterScore = letter => {
  const upperLetter = letter.toUpperCase()
  if (LEGENDARY_LETTERS.includes(upperLetter)) return CARD_SCORES.LEGENDARY
  if (VOWELS.includes(upperLetter)) return CARD_SCORES.VOWEL
  if (EPIC_CONSONANTS.includes(upperLetter)) return CARD_SCORES.EPIC
  if (UNCOMMON_CONSONANTS.includes(upperLetter)) return CARD_SCORES.UNCOMMON
  if (RARE_CONSONANTS.includes(upperLetter)) return CARD_SCORES.RARE
  return 0
}

/**
 * Calculate the total score for all letters in a word
 * @param {string} word - The word to calculate letter scores for
 * @returns {number} The total score of all letters
 */
export const calculateWordLettersScore = word => {
  return word
    .split('')
    .reduce((score, letter) => score + calculateLetterScore(letter), 0)
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
 * Calculate total score for a word including type multiplier and length bonus
 * @param {string} word - The word to score
 * @param {string} wordType - The type of word (noun, verb, etc.)
 * @returns {Object} Object containing score and whether word is disgusting
 */
export const calculateWordTotalScore = (word, wordType) => {
  // Calculate base score from letters
  const letterScore = calculateWordLettersScore(word)

  // Apply word type multiplier and word length
  const multiplier =
    WORD_TYPE_MULTIPLIER[wordType.toLowerCase()] || WORD_TYPE_MULTIPLIER.unknown
  const score = letterScore * multiplier * word.length

  // Check if word is disgusting and apply penalty
  const isDisgusting = isDisgustingWord(word)
  const finalScore = isDisgusting
    ? score * DISGUSTING_WORD_STYLE.MULTIPLIER
    : score

  return {
    score: finalScore,
    isDisgusting,
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
