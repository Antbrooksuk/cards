import React from 'react'
import { useGame } from '../../context/GameContext'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import { CARD_COLORS } from '../../constants/tailwindClasses'

const BuffBar = () => {
  const { legendaryLetterPlayed } = useGame()

  return (
    <div className='flex gap-4 justify-center items-center'>
      <div
        className={`px-2 py-1 rounded-lg ${
          legendaryLetterPlayed === '?'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        Question?
      </div>
      <div
        className={`px-2 py-1 rounded-lg ${
          legendaryLetterPlayed === '!'
            ? `${CARD_COLORS.legendary} text-white`
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        Exclamation!
      </div>
    </div>
  )
}

export default BuffBar
