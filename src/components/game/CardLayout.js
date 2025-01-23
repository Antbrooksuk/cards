import React from 'react'
import { CARD_CLASSES } from '../../constants/tailwindClasses'

const CardLayout = ({ id, letter, score, children }) => {
  return (
    <div className={CARD_CLASSES.content}>
      <span className={CARD_CLASSES.id}>{id}</span>
      <span className={CARD_CLASSES.letter}>{letter}</span>
      <span className={CARD_CLASSES.score}>{score}</span>
      {children}
    </div>
  )
}

export default CardLayout
