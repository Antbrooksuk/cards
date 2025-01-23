import React from 'react'
import { CARD_LAYOUT } from '../../constants/cardConstants'

const CardLayout = ({ id, letter, score, children }) => {
  return (
    <div className={CARD_LAYOUT.CONTENT}>
      <span className={CARD_LAYOUT.ID}>{id}</span>
      <span className={CARD_LAYOUT.LETTER}>{letter}</span>
      <span className={CARD_LAYOUT.SCORE}>{score}</span>
      {children}
    </div>
  )
}

export default CardLayout
