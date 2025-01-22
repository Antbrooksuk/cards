import { useCallback } from 'react';
import { validateWordWithDictionary } from '../utils/dictionaryApi';

/**
 * Performs basic validation rules on a word
 * @param {string} word - The word to validate
 * @returns {{isValid: boolean, reason?: string, word?: string}} Validation result
 */
const validateBasicRules = (word) => {
  if (!word || typeof word !== 'string') {
    return {
      isValid: false,
      reason: 'Invalid input'
    };
  }

  const trimmedWord = word.trim().toLowerCase();

  // Length check
  if (trimmedWord.length < 3) {
    return {
      isValid: false,
      reason: 'Word must be at least 3 letters long'
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
  if (trimmedWord.length > 15) {
    return {
      isValid: false,
      reason: 'Word is too long (maximum 15 letters)'
    };
  }

  return {
    isValid: true,
    word: trimmedWord
  };
};

const useWordValidation = () => {
  const validateWord = useCallback(async (word) => {
    // First perform basic validation
    const basicValidation = validateBasicRules(word);
    if (!basicValidation.isValid) {
      return basicValidation;
    }

    // Then check against dictionary API
    return await validateWordWithDictionary(basicValidation.word);
  }, []);

  return {
    validateWord
  };
};

export default useWordValidation;
