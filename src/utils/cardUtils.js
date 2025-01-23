import {
  CARD_TYPE,
  LEGENDARY_LETTERS,
  EPIC_CONSONANTS,
  UNCOMMON_CONSONANTS,
  RARE_CONSONANTS,
  VOWELS,
  DECK_CONFIG,
  CARD_STYLES,
} from '../constants/cardConstants'

import { WORD_LENGTH, WORD_LENGTH_CLASSES } from '../constants/wordConstants'

// Static ID counter for generating unique card IDs
let cardIdCounter = 0

/**
 * Get the style class for a card based on its type and selection state
 * @param {CardType} type - The type of card
 * @param {boolean} isSelected - Whether the card is selected
 * @returns {string} The CSS class for the card style
 */
export const getCardStyle = (type, isSelected) => {
  if (isSelected) return CARD_STYLES.SELECTED
  switch (type) {
    case CARD_TYPE.LEGENDARY:
      return CARD_STYLES.LEGENDARY
    case CARD_TYPE.EPIC:
      return CARD_STYLES.EPIC
    case CARD_TYPE.UNCOMMON:
      return CARD_STYLES.UNCOMMON
    case CARD_TYPE.RARE:
      return CARD_STYLES.RARE
    case CARD_TYPE.VOWEL:
      return CARD_STYLES.VOWEL
    default:
      return CARD_STYLES.DEFAULT
  }
}

/**
 * Get the CSS class for a word based on its length
 * @param {number} length - The length of the word
 * @returns {string} The CSS class for the word length category
 */
export const getWordLengthClass = length => {
  if (length === WORD_LENGTH.LEGENDARY) return WORD_LENGTH_CLASSES.LEGENDARY
  if (length === WORD_LENGTH.EPIC) return WORD_LENGTH_CLASSES.EPIC
  if (length >= WORD_LENGTH.RARE_MIN && length <= WORD_LENGTH.RARE_MAX)
    return WORD_LENGTH_CLASSES.RARE
  if (length >= WORD_LENGTH.UNCOMMON_MIN && length <= WORD_LENGTH.UNCOMMON_MAX)
    return WORD_LENGTH_CLASSES.UNCOMMON
  return WORD_LENGTH_CLASSES.COMMON
}

/**
 * Creates a new card with a unique ID
 * @param {string} letter - The letter on the card
 * @param {CardType} type - The type of card (consonant/vowel)
 * @returns {Object} A new card object
 */
export const createCard = (letter, type) => ({
  id: ++cardIdCounter,
  letter,
  type: LEGENDARY_LETTERS.includes(letter.toUpperCase())
    ? CARD_TYPE.LEGENDARY
    : VOWELS.includes(letter.toUpperCase())
    ? CARD_TYPE.VOWEL
    : EPIC_CONSONANTS.includes(letter.toUpperCase())
    ? CARD_TYPE.EPIC
    : UNCOMMON_CONSONANTS.includes(letter.toUpperCase())
    ? CARD_TYPE.UNCOMMON
    : CARD_TYPE.RARE,
})

/**
 * Creates a complete deck of cards with configured number of consonant and vowel sets
 * @returns {Array} Array of card objects
 */
export const createDeck = () => {
  const deck = []

  // Add legendary sets
  for (let i = 0; i < DECK_CONFIG.LEGENDARY_SETS; i++) {
    LEGENDARY_LETTERS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.LEGENDARY))
    })
  }

  // Add epic consonant sets
  for (let i = 0; i < DECK_CONFIG.EPIC_CONSONANTS_SETS; i++) {
    EPIC_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.EPIC))
    })
  }

  // Add uncommon consonant sets
  for (let i = 0; i < DECK_CONFIG.UNCOMMON_CONSONANTS_SETS; i++) {
    UNCOMMON_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.UNCOMMON))
    })
  }

  // Add rare consonant sets
  for (let i = 0; i < DECK_CONFIG.RARE_CONSONANTS_SETS; i++) {
    RARE_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.RARE))
    })
  }

  // Add vowel sets
  for (let i = 0; i < DECK_CONFIG.VOWEL_SETS; i++) {
    VOWELS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.VOWEL))
    })
  }

  return deck
}

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
export const shuffleArray = array => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Checks if a hand of cards contains any vowels
 * @param {Array} hand - Array of card objects to check
 * @returns {boolean} True if hand contains at least one vowel
 */
export const hasVowels = hand => {
  return hand.some(card => card.type === CARD_TYPE.VOWEL)
}

/**
 * Deals a specified number of cards from the deck
 * @param {Array} deck - The deck to deal from
 * @param {number} count - Number of cards to deal
 * @returns {Object} Object containing dealt cards and remaining deck
 */
export const dealCards = (deck, count) => {
  if (count > deck.length) {
    throw new Error('Not enough cards in deck')
  }

  const dealtCards = deck.slice(0, count)
  const remainingDeck = deck.slice(count)

  return {
    dealtCards,
    remainingDeck,
  }
}

/**
 * Get the style class for a mini card based on its letter
 * @param {string} letter - The letter on the card
 * @returns {string} The CSS class for the card style
 */
export const getMiniCardStyle = letter => {
  const upperLetter = letter.toUpperCase()
  if (LEGENDARY_LETTERS.includes(upperLetter)) return CARD_STYLES.LEGENDARY
  if (EPIC_CONSONANTS.includes(upperLetter)) return CARD_STYLES.EPIC
  if (RARE_CONSONANTS.includes(upperLetter)) return CARD_STYLES.RARE
  if (UNCOMMON_CONSONANTS.includes(upperLetter)) return CARD_STYLES.UNCOMMON
  if (VOWELS.includes(upperLetter)) return CARD_STYLES.VOWEL
  return CARD_STYLES.DEFAULT
}
