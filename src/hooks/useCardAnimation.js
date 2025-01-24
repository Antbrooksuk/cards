import { useState, useEffect } from 'react'
import { ANIMATION_TIMING } from '../constants/cardConstants'

const useCardAnimation = (cards, clearNewFlags) => {
  const [animatingCards, setAnimatingCards] = useState(new Set())

  useEffect(() => {
    // Find new cards and animate them with a stagger
    const newCards = cards.reduce((acc, card, index) => {
      if (card.isNew) acc.push(index)
      return acc
    }, [])

    if (newCards.length > 0) {
      // Clear any existing animations
      setAnimatingCards(new Set())

      // Initial delay before starting animations
      const initialDelay = 100

      // Randomize the order of animations
      const shuffledIndices = [...newCards]
      for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffledIndices[i], shuffledIndices[j]] = [
          shuffledIndices[j],
          shuffledIndices[i],
        ]
      }

      // Stagger the animations with randomized delays
      shuffledIndices.forEach((cardIndex, i) => {
        // Add some randomness to the stagger delay
        const randomDelay = Math.random() * 100 // Random delay between 0-100ms
        const baseStaggerDelay = i * ANIMATION_TIMING.SHUFFLE_STAGGER_DELAY
        const totalDelay = initialDelay + baseStaggerDelay + randomDelay

        setTimeout(() => {
          setAnimatingCards(prev => new Set([...prev, cardIndex]))
        }, totalDelay)
      })

      // Calculate total duration including all animations and random delays
      const totalDuration =
        initialDelay +
        (shuffledIndices.length - 1) * ANIMATION_TIMING.SHUFFLE_STAGGER_DELAY +
        100 + // Account for max random delay
        ANIMATION_TIMING.SHUFFLE_ANIMATION_DURATION

      // Add extra buffer time to ensure animations complete
      const cleanupDelay = totalDuration + 100

      setTimeout(() => {
        setAnimatingCards(new Set())
        clearNewFlags()
      }, cleanupDelay)
    }
  }, [cards, clearNewFlags])

  return animatingCards
}

export default useCardAnimation
