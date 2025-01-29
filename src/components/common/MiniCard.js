import React from 'react'
import { MINI_CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle, getLetterType } from '../../utils/cardUtils'

const MiniCard = ({ letter, index = 0 }) => {
  return (
    <div
      className={`${getCardStyle(getLetterType(letter), false, true)} ${
        MINI_CARD_CLASSES.base
      } ${index % 2 === 0 ? 'translate-y-[1px]' : '-translate-y-[1px]'}`}
    >
      <div
        className={`${MINI_CARD_CLASSES.inner.base} ${
          MINI_CARD_CLASSES.inner[getLetterType(letter).toLowerCase()]
        }`}
      >
        <div className={MINI_CARD_CLASSES.content}>
          <span className={MINI_CARD_CLASSES.letter}>
            {letter.toUpperCase()}
          </span>
          {/* <span className={MINI_CARD_CLASSES.score}>
            {calculateLetterScore(letter)}
          </span> */}
        </div>
      </div>
    </div>
  )
}

export default MiniCard
