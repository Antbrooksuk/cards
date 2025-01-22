// Static ID counter for generating unique card IDs
let cardIdCounter = 0;

/**
 * Card types enum
 */
export const CardType = {
  CONSONANT: 'consonant',
  VOWEL: 'vowel',
};

/**
 * List of all consonants and vowels
 */
export const CONSONANTS = [
  'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
  'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'
];

export const VOWELS = ['A', 'E', 'I', 'O', 'U'];

/**
 * Word type multipliers for scoring
 */
export const WordTypeMultiplier = {
  noun: 2,
  verb: 4,
  adjective: 8,
  adverb: 16,
  preposition: 16,
  pronoun: 16,
  conjunction: 16,
  interjection: 16,
  unknown: 1
};

/**
 * Calculate score for a single letter
 * @param {string} letter - The letter to score
 * @returns {number} The score for the letter
 */
export const calculateLetterScore = (letter) => {
  return VOWELS.includes(letter.toUpperCase()) ? 50 : 100;
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
  
  // Apply word type multiplier
  const multiplier = WordTypeMultiplier[wordType.toLowerCase()] || WordTypeMultiplier.unknown;
  return baseScore * multiplier;
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
  type,
});

/**
 * Creates a complete deck of cards with 2 sets of consonants and 4 sets of vowels
 * @returns {Array} Array of card objects
 */
export const createDeck = () => {
  const deck = [];

  // Add 2 sets of consonants
  for (let i = 0; i < 2; i++) {
    CONSONANTS.forEach(letter => {
      deck.push(createCard(letter, CardType.CONSONANT));
    });
  }

  // Add 4 sets of vowels
  for (let i = 0; i < 4; i++) {
    VOWELS.forEach(letter => {
      deck.push(createCard(letter, CardType.VOWEL));
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
 * Deals a specified number of cards from the deck
 * @param {Array} deck - The deck to deal from
 * @param {number} count - Number of cards to deal
 * @returns {Object} Object containing dealt cards and remaining deck
 */
/**
 * Checks if a hand of cards contains any vowels
 * @param {Array} hand - Array of card objects to check
 * @returns {boolean} True if hand contains at least one vowel
 */
export const hasVowels = (hand) => {
  return hand.some(card => card.type === CardType.VOWEL);
};

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
