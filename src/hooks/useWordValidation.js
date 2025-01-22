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

    // Only letters and legendary characters allowed
    if (!/^[a-z!?]+$/.test(trimmedWord)) {
      return {
        isValid: false,
        reason: 'Word must contain only letters and legendary characters (! or ?)'
      };
    }

    // Maximum length check
    if (trimmedWord.length > maxWordLength) {
      return {
        isValid: false,
        reason: `Word is too long (maximum ${maxWordLength} letters)`
      };
    }

    // Remove legendary letters before API validation
    const wordWithoutLegendary = trimmedWord.replace(/[!?]/g, '');
    
    // If word becomes too short after removing legendary letters
    if (wordWithoutLegendary.length < minWordLength) {
      return {
        isValid: false,
        reason: `Word must be at least ${minWordLength} letters long (excluding legendary letters)`
      };
    }

    // All basic validations passed, check against dictionary API
    return await validateWordWithDictionary(wordWithoutLegendary);
  }, [minWordLength, maxWordLength]);

  return {
    validateWord
  };
};

export default useWordValidation;
