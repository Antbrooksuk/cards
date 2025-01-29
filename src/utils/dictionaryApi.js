import { API_ENDPOINTS } from '../constants/apiConstants'
import { ERROR_MESSAGES } from '../constants/gameConstants'
import { CACHE_CONFIG } from '../constants/apiConstants'

const CACHE_PREFIX = 'wordCache_'

/**
 * Get all cache keys
 * @returns {string[]} Array of cache keys
 */
const getCacheKeys = () => {
  return Object.keys(localStorage).filter(key => key.startsWith(CACHE_PREFIX))
}

/**
 * Clean up expired or excess cache entries
 */
const cleanupCache = () => {
  const keys = getCacheKeys()
  const now = Date.now()

  // Remove expired entries and collect valid entries
  const validEntries = keys
    .map(key => {
      const item = JSON.parse(localStorage.getItem(key))
      if (now - item.timestamp > CACHE_CONFIG.EXPIRY_TIME) {
        localStorage.removeItem(key)
        return null
      }
      return { key, timestamp: item.timestamp }
    })
    .filter(Boolean)

  // Remove oldest entries if we're over the size limit
  if (validEntries.length > CACHE_CONFIG.MAX_SIZE) {
    validEntries
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, validEntries.length - CACHE_CONFIG.MAX_SIZE)
      .forEach(({ key }) => localStorage.removeItem(key))
  }
}

/**
 * Get cached response if available and not expired
 * @param {string} key - Cache key
 * @returns {any|null} Cached value or null if not found/expired
 */
const getCachedResponse = key => {
  const cacheKey = CACHE_PREFIX + key
  const cachedItem = localStorage.getItem(cacheKey)

  if (!cachedItem) return null

  const { value, timestamp } = JSON.parse(cachedItem)

  if (Date.now() - timestamp > CACHE_CONFIG.EXPIRY_TIME) {
    localStorage.removeItem(cacheKey)
    return null
  }

  return value
}

/**
 * Cache a response with timestamp
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 */
const cacheResponse = (key, value) => {
  try {
    cleanupCache()

    const cacheKey = CACHE_PREFIX + key
    const cacheItem = {
      value,
      timestamp: Date.now(),
    }

    localStorage.setItem(cacheKey, JSON.stringify(cacheItem))
  } catch (error) {
    // Handle quota exceeded or other storage errors
    if (
      error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    ) {
      cleanupCache()
      try {
        const cacheKey = CACHE_PREFIX + key
        const cacheItem = {
          value,
          timestamp: Date.now(),
        }
        localStorage.setItem(cacheKey, JSON.stringify(cacheItem))
      } catch (retryError) {
        console.warn('Failed to cache response after cleanup:', retryError)
      }
    }
  }
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
    const { WORD_TYPE_MULTIPLIER } = await import(
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
