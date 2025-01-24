import React from 'react'
import MiniCard from '../common/MiniCard'
import { calculateLetterScore } from '../../utils/scoreUtils'

const WordScoreBreakdown = ({ word }) => {
  const totalLetterScore = word
    .split('')
    .reduce((total, letter) => total + calculateLetterScore(letter), 0)

  return (
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
    </div>
  )
}

export default WordScoreBreakdown
