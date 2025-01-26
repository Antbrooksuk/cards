import { ANIMATION_TIMING } from '../constants/cardConstants'
import { getResponsiveValues } from './animationUtils'
import { LAYOUT_DIMENSIONS } from '../constants/styleConstants'

export const calculateCongratsPositions = message => {
  const letters = message.split('')
  const { xSpacing, baseScale } = getResponsiveValues()
  const centerIndex = (letters.length - 1) / 2
  const verticalCenter =
    LAYOUT_DIMENSIONS.CONTAINER_HEIGHT / 2 - LAYOUT_DIMENSIONS.CARD_HEIGHT / 2

  return letters.map((_, index) => {
    const offset = index - centerIndex
    const xOffset = offset * xSpacing

    return {
      transform: `
        translate(calc(${xOffset}px - 50%), ${verticalCenter}px)
        scale(${baseScale})
      `,
      zIndex: index + 1, // Ensure increasing z-index from left to right
    }
  })
}

export const handleCongratsAnimation = (
  message,
  setCongratsMessage,
  setCongratsAnimatingIndices,
  setCongratsPositions,
) => {
  setCongratsMessage(message)
  setCongratsAnimatingIndices(new Set())

  const positions = calculateCongratsPositions(message)
  setCongratsPositions(positions)

  // Animate letters one by one with stagger delay
  message.split('').forEach((_, index) => {
    setTimeout(() => {
      setCongratsAnimatingIndices(prev => new Set([...prev, index]))
    }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
  })
}
