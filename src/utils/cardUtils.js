import { 
  CARD_TYPE,
  LEGENDARY_LETTERS,
  EPIC_CONSONANTS,
  UNCOMMON_CONSONANTS,
  RARE_CONSONANTS,
  VOWELS,
  WORD_TYPE_MULTIPLIER,
  VOWEL_SCORE,
  LEGENDARY_SCORE,
  EPIC_SCORE,
  UNCOMMON_SCORE,
  RARE_SCORE,
  LEGENDARY_SETS,
  EPIC_CONSONANTS_SETS,
  UNCOMMON_CONSONANTS_SETS,
  RARE_CONSONANTS_SETS,
  VOWEL_SETS
} from '../constants/gameConfig';

// Static ID counter for generating unique card IDs
let cardIdCounter = 0;

/**
 * Calculate score for a single letter
 * @param {string} letter - The letter to score
 * @returns {number} The score for the letter
 */
export const calculateLetterScore = (letter) => {
  const upperLetter = letter.toUpperCase();
  if (LEGENDARY_LETTERS.includes(upperLetter)) return LEGENDARY_SCORE;
  if (VOWELS.includes(upperLetter)) return VOWEL_SCORE;
  if (EPIC_CONSONANTS.includes(upperLetter)) return EPIC_SCORE;
  if (UNCOMMON_CONSONANTS.includes(upperLetter)) return UNCOMMON_SCORE;
  if (RARE_CONSONANTS.includes(upperLetter)) return RARE_SCORE;
  return 0; // Should never happen
};

/**
 * Calculate total score for a word
 * @param {string} word - The word to score
 * @param {string} wordType - The type of word (noun, verb, etc.)
 * @returns {number} The total score for the word
 */
export const calculateWordScore = (word, wordType) => {
  // Calculate base score from letters
  const baseScore = word
    .split('')
    .reduce((score, letter) => score + calculateLetterScore(letter), 0);
  
  // Apply word type multiplier and word length
  const multiplier = WORD_TYPE_MULTIPLIER[wordType.toLowerCase()] || WORD_TYPE_MULTIPLIER.unknown;
  return baseScore * multiplier * word.length;
};

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
});

/**
 * Creates a complete deck of cards with configured number of consonant and vowel sets
 * @returns {Array} Array of card objects
 */
export const createDeck = () => {
  const deck = [];

  // Add legendary sets
  for (let i = 0; i < LEGENDARY_SETS; i++) {
    LEGENDARY_LETTERS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.LEGENDARY));
    });
  }

  // Add epic consonant sets
  for (let i = 0; i < EPIC_CONSONANTS_SETS; i++) {
    EPIC_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.EPIC));
    });
  }

  // Add uncommon consonant sets
  for (let i = 0; i < UNCOMMON_CONSONANTS_SETS; i++) {
    UNCOMMON_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.UNCOMMON));
    });
  }

  // Add rare consonant sets
  for (let i = 0; i < RARE_CONSONANTS_SETS; i++) {
    RARE_CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.RARE));
    });
  }

  // Add vowel sets
  for (let i = 0; i < VOWEL_SETS; i++) {
    VOWELS.forEach(letter => {
      deck.push(createCard(letter, CARD_TYPE.VOWEL));
    });
  }

  return deck;
};

/**
 * Shuffles an array using the Fisher-Yates algorithm
 * @param {Array} array - The array to shuffle
 * @returns {Array} The shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Checks if a hand of cards contains any vowels
 * @param {Array} hand - Array of card objects to check
 * @returns {boolean} True if hand contains at least one vowel
 */
export const hasVowels = (hand) => {
  return hand.some(card => card.type === CARD_TYPE.VOWEL);
};

/**
 * Deals a specified number of cards from the deck
 * @param {Array} deck - The deck to deal from
 * @param {number} count - Number of cards to deal
 * @returns {Object} Object containing dealt cards and remaining deck
 */
export const dealCards = (deck, count) => {
  if (count > deck.length) {
    throw new Error('Not enough cards in deck');
  }

  const dealtCards = deck.slice(0, count);
  const remainingDeck = deck.slice(count);

  return {
    dealtCards,
    remainingDeck,
  };
};
