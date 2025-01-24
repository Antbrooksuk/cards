import React from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle } from '../../utils/cardUtils'
import CardLayout from '../game/CardLayout'

const Card = ({
  id,
  letter,
  type,
  isSelected,
  isAnimating,
  isNew,
  isExiting,
  onClick,
}) => {
  const getAnimationClass = () => {
    if (isExiting) return CARD_CLASSES.animation.exit
    if (isAnimating) {
      return `${CARD_CLASSES.animation.deal} ${CARD_CLASSES.animation.glow}`
    }
    if (isNew) {
      // Randomly choose between left and right shuffle animations
      const shuffleDirection =
        Math.random() < 0.5 ? 'shuffleInLeft' : 'shuffleInRight'
      return `animate-${shuffleDirection} ${CARD_CLASSES.animation.glow}`
    }
    return ''
  }

  const animationClass = getAnimationClass()

  return (
    <div
      onClick={onClick}
      className={`${getCardStyle(type, isSelected)} ${
        CARD_CLASSES.base
      } ${animationClass}`}
    >
      <CardLayout
        id={id}
        letter={letter}
        score={calculateLetterScore(letter)}
      />
    </div>
  )
}

export default Card
