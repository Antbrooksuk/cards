import React from 'react'
import {
  WORD_TYPE_COLORS,
  WORD_TYPE_MULTIPLIER,
} from '../../constants/gameConfig'
import { calculateWordScore } from '../../utils/cardUtils'
import MiniCard from './MiniCard'

const PlayedWord = ({ word, type, className = '' }) => {
  const typeColor = WORD_TYPE_COLORS[type?.toLowerCase() || 'unknown']
  const wordScore = calculateWordScore(word, type)

  return (
    <div
      className={`bg-gray-800 rounded-lg px-3 py-2 flex items-center gap-3 ${className}`}
    >
      <div className='flex gap-1'>
        {word.split('').map((letter, index) => (
          <MiniCard key={index} letter={letter} />
        ))}
      </div>
      <div className='flex items-center gap-2 text-sm'>
        <span className='bg-gray-700 text-white px-2 py-0.5 rounded-md'>
          Letters × {word.length}
        </span>
        <span className={`${typeColor} px-2 py-0.5 rounded-md`}>
          {type} × {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']}
        </span>
        <span className='bg-gray-700 text-white px-2 py-0.5 rounded-md font-bold'>
          {wordScore}
        </span>
      </div>
    </div>
  )
}

export default PlayedWord
