import { useState, useEffect } from 'react'
import { ANIMATION_TIMING } from '../constants/cardConstants'

const useCardAnimation = (cards, clearNewFlags) => {
  const [animatingCards, setAnimatingCards] = useState(new Set())

  useEffect(() => {
    // Only animate new cards being dealt
    const newCards = cards.reduce((acc, card, index) => {
      if (card.isNew) acc.push(index)
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

  return animatingCards
}

export default useCardAnimation
