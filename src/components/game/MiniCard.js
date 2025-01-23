import React from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { MINI_CARD_LAYOUT } from '../../constants/cardConstants'
import { getMiniCardStyle } from '../../utils/cardUtils'

const MiniCard = ({ letter }) => {
  return (
    <div
      className={`${getMiniCardStyle(letter)} ${MINI_CARD_LAYOUT.CONTAINER}`}
    >
      <div className={MINI_CARD_LAYOUT.CONTENT}>
        <span className={MINI_CARD_LAYOUT.LETTER}>{letter.toUpperCase()}</span>
        <span className={MINI_CARD_LAYOUT.SCORE}>
          {calculateLetterScore(letter)}
        </span>
      </div>
    </div>
  )
}

export default MiniCard
