import { useState, useEffect, useRef } from 'react'
import { ANIMATION_TIMING } from '../constants/cardConstants'

const useCardAnimation = (cards, clearNewFlags) => {
  const [animatingCards, setAnimatingCards] = useState(new Set())
  const animationDurations = useRef(new Map())

  const getAnimationDuration = cardIndex => {
    if (!animationDurations.current.has(cardIndex)) {
      // Generate and store a persistent random duration between 2-4 seconds
      animationDurations.current.set(cardIndex, Math.random() * 2000 + 2000)
    }
    return animationDurations.current.get(cardIndex)
  }

  useEffect(() => {
    // Only animate new cards being dealt
    const newCards = cards.reduce((acc, card, index) => {
      if (card.isNew) {
        acc.push(index)
        // Generate new duration for new cards
        getAnimationDuration(index)
      }
      return acc
    }, [])

    if (newCards.length > 0) {
      setAnimatingCards(new Set())

      // Deal cards sequentially with a short delay
      newCards.forEach((cardIndex, i) => {
        setTimeout(() => {
          setAnimatingCards(prev => new Set([...prev, cardIndex]))
        }, i * ANIMATION_TIMING.CARD_STAGGER_DELAY)
      })

      // Clear animations after all cards are dealt
      const totalDuration =
        newCards.length * ANIMATION_TIMING.CARD_STAGGER_DELAY +
        ANIMATION_TIMING.CARD_ANIMATION_DURATION

      setTimeout(() => {
        setAnimatingCards(new Set())
        clearNewFlags()
      }, totalDuration)
    }
  }, [cards, clearNewFlags])

  return {
    animatingCards,
    getAnimationDuration,
  }
}

export default useCardAnimation
