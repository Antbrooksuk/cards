import React from 'react'
import MiniCard from './MiniCard'
import { calculateLetterScore } from '../../utils/scoreUtils'

const WordScoreBreakdown = ({ word }) => {
  return (
    <div className='flex items-center gap-2'>
      <div className='flex gap-1'>
        {word.split('').map((letter, index) => (
          <MiniCard key={index} letter={letter} index={index} />
        ))}
      </div>
    </div>
  )
}

export default WordScoreBreakdown
