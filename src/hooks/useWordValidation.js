import { useCallback } from 'react';
import { validateWordWithDictionary } from '../utils/dictionaryApi';
import { useGame } from '../context/GameContext';

/**
 * Performs basic validation rules on a word
 * @param {string} word - The word to validate
 * @returns {{isValid: boolean, reason?: string, word?: string}} Validation result
 */
const validateBasicRules = (word, minWordLength, maxWordLength) => {
  if (!word || typeof word !== 'string') {
    return {
      isValid: false,
      reason: 'Invalid input'
    };
  }

  const trimmedWord = word.trim().toLowerCase();

  // Length check
  if (trimmedWord.length < minWordLength) {
    return {
      isValid: false,
      reason: `Word must be at least ${minWordLength} letters long`
    };
  }

  // Only letters allowed
  if (!/^[a-z]+$/.test(trimmedWord)) {
    return {
      isValid: false,
      reason: 'Word must contain only letters'
    };
  }

  // Maximum length check
  if (trimmedWord.length > maxWordLength) {
    return {
      isValid: false,
      reason: `Word is too long (maximum ${maxWordLength} letters)`
    };
  }

  return {
    isValid: true,
    word: trimmedWord
  };
};

const useWordValidation = () => {
  const { minWordLength, maxWordLength } = useGame();
  
  const validateWord = useCallback(async (word) => {
    // First perform basic validation
    const basicValidation = validateBasicRules(word, minWordLength, maxWordLength);
    if (!basicValidation.isValid) {
      return basicValidation;
    }

    // Then check against dictionary API
    return await validateWordWithDictionary(basicValidation.word);
  }, [minWordLength, maxWordLength]);

  return {
    validateWord
  };
};

export default useWordValidation;
