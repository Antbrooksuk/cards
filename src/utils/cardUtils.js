import {
  CARD_TYPE,
  LEGENDARY_LETTERS,
  EPIC_CONSONANTS,
  UNCOMMON_CONSONANTS,
  RARE_CONSONANTS,
  VOWELS,
  DECK_CONFIG,
} from '../constants/cardConstants'
import { CARD_COLORS } from '../constants/tailwindClasses'
import { WORD_LENGTH, WORD_LENGTH_CLASSES } from '../constants/wordConstants'

// Static ID counter for generating unique card IDs
let cardIdCounter = 0

/**
 * Determines the type of a letter based on its rarity
 * @param {string} letter - The letter to check
 * @returns {string} The card type constant
 */
export const getLetterType = letter => {
  const upperLetter = letter.toUpperCase()
  if (LEGENDARY_LETTERS.includes(upperLetter)) return CARD_TYPE.LEGENDARY
  if (VOWELS.includes(upperLetter)) return CARD_TYPE.VOWEL
  if (EPIC_CONSONANTS.includes(upperLetter)) return CARD_TYPE.EPIC
  if (UNCOMMON_CONSONANTS.includes(upperLetter)) return CARD_TYPE.UNCOMMON
  return CARD_TYPE.RARE
}

/**
 * Get the style class for a card based on its type and selection state
 * @param {CardType} type - The type of card
 * @param {boolean} isMini - Whether this is a mini card
 * @returns {string} The CSS class for the card style
 */
export const getCardStyle = (type, isMini = false) => {
  switch (type) {
    case CARD_TYPE.LEGENDARY:
      return CARD_COLORS.legendary
    case CARD_TYPE.EPIC:
      return CARD_COLORS.epic
    case CARD_TYPE.UNCOMMON:
      return CARD_COLORS.uncommon
    case CARD_TYPE.RARE:
      return CARD_COLORS.rare
    case CARD_TYPE.VOWEL:
      return CARD_COLORS.common
    default:
      return CARD_COLORS.default
  }
}

/**
 * Get the CSS class for a word based on its length
 * @param {number} length - The length of the word
 * @returns {string} The CSS class for the word length category
 */
export const getWordLengthClass = length => {
  if (
    length >= WORD_LENGTH.LEGENDARY_MIN &&
    length <= WORD_LENGTH.LEGENDARY_MAX
  )
    return WORD_LENGTH_CLASSES.LEGENDARY
  if (length >= WORD_LENGTH.EPIC_MIN && length <= WORD_LENGTH.EPIC_MAX)
    return WORD_LENGTH_CLASSES.EPIC
  if (length >= WORD_LENGTH.RARE_MIN && length <= WORD_LENGTH.RARE_MAX)
    return WORD_LENGTH_CLASSES.RARE
  if (length >= WORD_LENGTH.UNCOMMON_MIN && length <= WORD_LENGTH.UNCOMMON_MAX)
    return WORD_LENGTH_CLASSES.UNCOMMON
  return WORD_LENGTH_CLASSES.COMMON
}

/**
 * Creates a new card with a unique ID
 * @param {string} letter - The letter on the card
 * @returns {Object} A new card object
 */
export const createCard = letter => ({
  id: ++cardIdCounter,
  letter,
  type: getLetterType(letter),
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

/**
 * Gets the complete className string for a card in the hand
 * @param {Object} options - Class configuration options
 * @param {boolean} options.isInWord - Whether card is in word area
 * @param {boolean} options.isAnimating - Whether card is animating
 * @param {string} options.cardAnimationState - Current animation state
 * @param {boolean} options.handAnimating - Whether hand is animating
 * @param {boolean} options.isDealing - Whether cards are being dealt
 * @returns {string} Combined className string
 */
export const getHandCardClassNames = ({
  isInWord,
  cardAnimationState,
  handAnimating,
  isDealing,
  gameStatus,
}) => {
  const classes = ['absolute', '[perspective:1000px]', 'left-[50%]', 'top-0']

  // Animation classes
  if (
    cardAnimationState === 'ENTERING_WORD' ||
    cardAnimationState === 'EXITING_WORD' ||
    handAnimating ||
    isDealing
  ) {
    classes.push('transition-transform', 'duration-300')
  }

  // Interaction classes
  if (!isInWord && gameStatus === 'playing') {
    classes.push('cursor-move')
  }

  // Disable interactions when not in playing state
  if (gameStatus !== 'playing') {
    classes.push('pointer-events-none', 'select-none')
  }

  return classes.join(' ')
}

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
