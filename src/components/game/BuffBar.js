import React from 'react'
import { useGame } from '../../context/GameContext'
import { CARD_COLORS } from '../../constants/tailwindClasses'
import Tooltip from '../common/Tooltip'

const BuffBar = () => {
  const { legendaryLetterPlayed } = useGame()

  return (
    <div className='buff-bar'>
      <Tooltip content={`Question Buff`}>
        <div
          className={`px-2 py-1 w-8 font-bold text-center rounded-b-md ${
            legendaryLetterPlayed === '?'
              ? `${CARD_COLORS.legendary} text-white`
              : 'bg-white/20 text-[rgba(0,0,0,0.5)]'
          }`}
        >
          ?
        </div>
      </Tooltip>
      <Tooltip content={`Exclamation Buff`}>
        <div
          className={`px-2 py-1 w-8 font-bold text-center rounded-b-md ${
            legendaryLetterPlayed === '!'
              ? `${CARD_COLORS.legendary} text-white`
              : 'bg-white/20 text-[rgba(0,0,0,0.5)]'
          }`}
        >
          !
        </div>
      </Tooltip>
    </div>
  )
}

export default BuffBar
