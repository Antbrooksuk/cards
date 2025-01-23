import { API_ENDPOINTS } from '../constants/apiConstants'
import { ERROR_MESSAGES } from '../constants/gameConstants'
import { CACHE_CONFIG } from '../constants/apiConstants'

// Simple in-memory cache
const cache = new Map()
const cacheTimestamps = new Map()

/**
 * Get cached response if available and not expired
 * @param {string} key - Cache key
 * @returns {any|null} Cached value or null if not found/expired
 */
const getCachedResponse = key => {
  if (!cache.has(key)) return null

  const timestamp = cacheTimestamps.get(key)
  if (Date.now() - timestamp > CACHE_CONFIG.EXPIRY_TIME) {
    cache.delete(key)
    cacheTimestamps.delete(key)
    return null
  }

  return cache.get(key)
}

/**
 * Cache a response with timestamp
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 */
const cacheResponse = (key, value) => {
  // Remove oldest entry if cache is full
  if (cache.size >= CACHE_CONFIG.MAX_SIZE) {
    const oldestKey = cache.keys().next().value
    cache.delete(oldestKey)
    cacheTimestamps.delete(oldestKey)
  }

  cache.set(key, value)
  cacheTimestamps.set(key, Date.now())
}

/**
 * Validates a word using the Dictionary API
 * @param {string} word - The word to validate
 * @returns {Promise<{isValid: boolean, reason?: string, word?: string, wordType?: string}>} Validation result
 */
export const validateWordWithDictionary = async word => {
  // Check cache first
  const cachedResult = getCachedResponse(word)
  if (cachedResult) return cachedResult

  try {
    const response = await fetch(`${API_ENDPOINTS.DICTIONARY}/${word}`)
    if (!response.ok) {
      const errorData = await response.json()
      const result = {
        isValid: false,
        reason: errorData.message || ERROR_MESSAGES.WORD_NOT_FOUND,
      }
      cacheResponse(word, result)
      return result
    }

    const data = await response.json()
    const { WORD_TYPE_MULTIPLIER, DISGUSTING_WORDS } = await import(
      '../constants/wordConstants.js'
    )

    const meanings = data[0]?.meanings || []
    let highestScore = 0
    let dominantType = 'unknown'

    meanings.forEach(meaning => {
      const wordType = meaning.partOfSpeech
      const score = WORD_TYPE_MULTIPLIER[wordType] || 1
      if (score > highestScore) {
        highestScore = score
        dominantType = wordType
      }
    })

    const result = {
      isValid: true,
      word: word,
      wordType: dominantType,
      isDisgusting: DISGUSTING_WORDS.includes(word.toUpperCase()),
    }

    cacheResponse(word, result)
    return result
  } catch (error) {
    const result = {
      isValid: false,
      reason: ERROR_MESSAGES.DICTIONARY_VALIDATION_FAILED,
    }
    cacheResponse(word, result)
    return result
  }
}
