import React from 'react'
import {
  WORD_TYPE_COLORS,
  WORD_TYPE_MULTIPLIER,
} from '../../constants/gameConfig'
import { calculateWordScore, calculateLetterScore } from '../../utils/cardUtils'
import MiniCard from './MiniCard'

const PlayedWord = ({ word, type, isInvalid = false, className = '' }) => {
  const typeColor = isInvalid
    ? 'text-red-600'
    : WORD_TYPE_COLORS[type?.toLowerCase() || 'unknown']
  const wordScore = isInvalid ? null : calculateWordScore(word, type)
  const totalLetterScore = word
    .split('')
    .reduce((total, letter) => total + calculateLetterScore(letter), 0)

  return (
    <div
      className={`bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-3 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <div className='flex gap-1'>
          {word.split('').map((letter, index) => (
            <MiniCard key={index} letter={letter} />
          ))}
        </div>
        <span>=</span>
        <span className='flex h-10 font-bold text-lg items-center bg-gray-200 px-2 py-0.5 rounded-md'>
          {totalLetterScore}
        </span>
        <span>x</span>
      </div>
      {isInvalid ? (
        <div className='flex items-center'>
          <span className='text-red-600 text-sm font-semibold'>
            Invalid Word
          </span>
        </div>
      ) : (
        <div className='flex items-center gap-2 text-sm'>
          <span className='flex h-10 font-bold text-lg items-center bg-gray-200 px-2 py-0.5 rounded-md'>
            LETTERS × {word.length}
          </span>
          <span>x</span>
          <span
            className={`flex h-10 font-bold text-lg items-center ${typeColor} px-2 py-0.5 rounded-md`}
          >
            {type.toUpperCase()} ×{' '}
            {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']}
          </span>
          <span>=</span>
          <span className='flex h-10 font-bold text-lg items-center bg-gray-200 px-2 py-0.5 rounded-md font-bold'>
            {wordScore}
          </span>
        </div>
      )}
    </div>
  )
}

export default PlayedWord
