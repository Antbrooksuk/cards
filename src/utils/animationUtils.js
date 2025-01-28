import { ANIMATION_TIMING, CARD_ANIMATION } from '../constants/cardConstants'
import { LAYOUT_DIMENSIONS } from '../constants/styleConstants'
import { MAX_HAND_SIZE } from '../constants/gameConstants'

export const handleCongratsAnimation = (
  message,
  setCongratsMessage,
  setCongratsAnimatingIndices,
  setCongratsPositions,
) => {
  setCongratsMessage(message)
  setCongratsAnimatingIndices(new Set())

  // Calculate positions for letters in a centered line
  const letters = message.split('')
  const { xSpacing, baseScale } = getResponsiveValues()
  const letterSpacing = xSpacing * 0.8 // Adjust spacing between letters
  const totalWidth = (letters.length - 1) * letterSpacing

  const positions = letters.map((_, index) => {
    const xOffset = index * letterSpacing - totalWidth / 2
    return {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${baseScale}) !important`,
    }
  })

  setCongratsPositions(positions)

  // Animate letters one by one with the same stagger delay
  letters.forEach((_, index) => {
    setTimeout(() => {
      setCongratsAnimatingIndices(prev => new Set([...prev, index]))
    }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
  })
}

export const handleCardExitAnimation = (playerHand, setExitingCards, index) => {
  setTimeout(() => {
    setExitingCards(prev => new Set([...prev, playerHand.length - 1 - index]))
  }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
}

export const getResponsiveValues = () => {
  const width = window.innerWidth
  return {
    xSpacing: Math.min(width / 11, 50),
    baseScale: Math.min(width / 500, CARD_ANIMATION.WORD_CARD_SCALE),
  }
}

export const getHandCardPosition = (index, totalCards) => {
  const centerIndex = (totalCards - 1) / 2
  const offset = index - centerIndex

  const { xSpacing, baseScale } = getResponsiveValues()
  const xOffset = offset * xSpacing

  // Calculate curve height relative to number of cards
  const curveHeight =
    (totalCards - 1) *
    (LAYOUT_DIMENSIONS.MAX_CURVE_HEIGHT / (MAX_HAND_SIZE - 1))
  const yOffset =
    ((offset * offset) / (centerIndex * centerIndex)) * curveHeight

  return {
    transform: `
      translate(calc(${xOffset}px - 50%), ${
      LAYOUT_DIMENSIONS.BOTTOM_HALF_CENTER - yOffset
    }px)
      scale(${baseScale})
    `,
  }
}

export const getWordCardPosition = (index, totalCards) => {
  const centerIndex = (totalCards - 1) / 2
  const offset = index - centerIndex
  const { xSpacing, baseScale } = getResponsiveValues()

  return {
    transform: `
      translate(calc(${offset * xSpacing}px - 50%), ${
      LAYOUT_DIMENSIONS.TOP_HALF_CENTER
    }px)
      scale(${baseScale})
    `,
    zIndex: index + 1, // Ensure increasing z-index from left to right
  }
}
