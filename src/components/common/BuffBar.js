import React from 'react'
import { useGame } from '../../context/GameContext'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import { CARD_COLORS } from '../../constants/tailwindClasses'

const BuffBar = () => {
  const { legendaryLetterPlayed } = useGame()

  return (
    <div className='flex gap-4 p-4 justify-center items-center bg-blue-500 rounded-t-lg'>
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
