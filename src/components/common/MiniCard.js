import React from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { MINI_CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle, getLetterType } from '../../utils/cardUtils'

const MiniCard = ({ letter }) => {
  return (
    <div
      className={`${getCardStyle(getLetterType(letter), false, true)} ${
        MINI_CARD_CLASSES.base
      }`}
    >
      <div className={MINI_CARD_CLASSES.content}>
        <span className={MINI_CARD_CLASSES.letter}>{letter.toUpperCase()}</span>
        <span className={MINI_CARD_CLASSES.score}>
          {calculateLetterScore(letter)}
        </span>
      </div>
    </div>
  )
}

export default MiniCard
