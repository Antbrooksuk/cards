import React from 'react'
import { useGame } from '../../context/GameContext'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import { CARD_COLORS } from '../../constants/tailwindClasses'

const BuffBar = () => {
  const { legendaryLetterPlayed } = useGame()

  return (
    <div className='buff-bar'>
      <div
        className={`px-2 py-1 rounded-lg ${
          legendaryLetterPlayed === '?'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-white/20 text-black'
        }`}
      >
        Question?
      </div>
      <div
        className={`px-2 py-1 rounded-lg ${
          legendaryLetterPlayed === '!'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-white/20 text-black'
        }`}
      >
        Exclamation!
      </div>
    </div>
  )
}

export default BuffBar
