import React from 'react'
import { calculateWordTotalScore } from '../../utils/scoreUtils'
import WordScoreBreakdown from './WordScoreBreakdown'
import WordTypeBonus from './WordTypeBonus'

const PlayedWord = ({ word, type, isInvalid = false, className = '' }) => {
  const wordScoreResult = isInvalid ? null : calculateWordTotalScore(word, type)
  const wordScore = wordScoreResult?.score

  return (
    <div className={`flex w-full border-b border-black pb-4 ${className}`}>
      {isInvalid ? (
        <div className='flex w-full flex-col gap-4 x items-center'>
          <WordScoreBreakdown word={word} />
          <div className='flex  w-full flex-col gap-1 x items-center'>
            <span className='text-red-600 text-sm font-semibold'>
              Invalid Word
            </span>
          </div>
        </div>
      ) : (
        <div className='flex w-full flex-col gap-4 x items-center'>
          <WordScoreBreakdown word={word} />
          <div className='flex  w-full flex-col gap-1 x items-center'>
            <WordTypeBonus
              word={word}
              type={type}
              wordScoreResult={wordScoreResult}
            />
            <span className='flex w-full font-bold text-sm items-center bg-gray-800 text-white px-2 py-0.5 rounded-md'>
              TOTAL: {wordScore}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayedWord
