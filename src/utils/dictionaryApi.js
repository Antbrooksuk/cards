/**
 * Validates a word using the Dictionary API
 * @param {string} word - The word to validate
 * @returns {Promise<{isValid: boolean, reason?: string, word?: string, wordType?: string}>} Validation result
 */
export const validateWordWithDictionary = async word => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    )
    if (!response.ok) {
      const errorData = await response.json()
      return {
        isValid: false,
        reason: errorData.message || 'Word not found in dictionary',
      }
    }

    const data = await response.json()

    // Import word type multipliers and disgusting words
    const { WORD_TYPE_MULTIPLIER, DISGUSTING_WORDS } = await import(
      '../constants/gameConfig.js'
    )

    // Get all meanings
    const meanings = data[0]?.meanings || []
    let highestScore = 0
    let dominantType = 'unknown'

    // Find the part of speech with highest score multiplier
    meanings.forEach(meaning => {
      const wordType = meaning.partOfSpeech
      const score = WORD_TYPE_MULTIPLIER[wordType] || 1
      if (score > highestScore) {
        highestScore = score
        dominantType = wordType
      }
    })

    return {
      isValid: true,
      word: word,
      wordType: dominantType,
      isDisgusting: DISGUSTING_WORDS.includes(word.toUpperCase()),
    }
  } catch (error) {
    return {
      isValid: false,
      reason: 'Dictionary validation failed',
    }
  }
}
