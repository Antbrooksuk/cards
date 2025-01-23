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

      // Stagger the animations
      newCards.forEach((cardIndex, i) => {
        setTimeout(() => {
          setAnimatingCards(prev => new Set([...prev, cardIndex]))
        }, i * ANIMATION_TIMING.CARD_STAGGER_DELAY)
      })

      // Remove animation classes and isNew flags after they complete
      const totalDuration =
        newCards.length * ANIMATION_TIMING.CARD_STAGGER_DELAY +
        ANIMATION_TIMING.CARD_ANIMATION_DURATION
      setTimeout(() => {
        setAnimatingCards(new Set())
        clearNewFlags()
      }, totalDuration)
    }
  }, [cards, clearNewFlags])

  return animatingCards
}

export default useCardAnimation
