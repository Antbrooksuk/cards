import React from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { CARD_ANIMATION, CARD_LAYOUT } from '../../constants/cardConstants'
import { getCardStyle } from '../../utils/cardUtils'
import CardLayout from './CardLayout'

const Card = ({
  id,
  letter,
  type,
  isSelected,
  isAnimating,
  isNew,
  onClick,
}) => {
  const animationClasses = `${CARD_ANIMATION.BASE} ${
    isAnimating ? CARD_ANIMATION.DEAL : isNew ? CARD_ANIMATION.NEW : ''
  }`

  return (
    <div
      onClick={onClick}
      className={`${getCardStyle(type, isSelected)} font-bold text-2xl ${
        CARD_LAYOUT.CONTAINER
      } ${animationClasses}`}
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
