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
  const animationClass = isExiting
    ? CARD_CLASSES.animation.exit
    : isAnimating
    ? CARD_CLASSES.animation.deal
    : isNew
    ? CARD_CLASSES.animation.new
    : ''

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
