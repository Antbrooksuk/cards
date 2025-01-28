import React from 'react'
import { useGame } from '../../context/GameContext'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import { CARD_COLORS } from '../../constants/tailwindClasses'

const BuffBar = () => {
  const { legendaryLetterPlayed } = useGame()

  return (
    <div className='buff-bar'>
      <div
        className={`px-2 py-1 w-8 font-bold text-center rounded-md ${
          legendaryLetterPlayed === '?'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-white/20 text-[rgba(0,0,0,0.5)]'
        }`}
      >
        ?
      </div>
      <div
        className={`px-2 py-1 w-8 font-bold text-center rounded-md ${
          legendaryLetterPlayed === '!'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-white/20 text-[rgba(0,0,0,0.5)]'
        }`}
      >
        !
      </div>
    </div>
  )
}

export default BuffBar
