import { useCallback } from 'react';
import { validateWordWithDictionary } from '../utils/dictionaryApi';

const useWordValidation = (config = { minWordLength: 2, maxWordLength: 15 }) => {
  const { minWordLength, maxWordLength } = config;
  
  const validateWord = useCallback(async (word) => {
    // First perform basic validation
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

    // All basic validations passed, check against dictionary API
    return await validateWordWithDictionary(trimmedWord);
  }, [minWordLength, maxWordLength]);

  return {
    validateWord
  };
};

export default useWordValidation;
