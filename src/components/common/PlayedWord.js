import React from 'react'
import { calculateWordTotalScore } from '../../utils/scoreUtils'
import WordScoreBreakdown from './WordScoreBreakdown'
import WordTypeBonus from './WordTypeBonus'

const PlayedWord = ({ word, type, isInvalid = false, className = '' }) => {
  const wordScoreResult = isInvalid ? null : calculateWordTotalScore(word, type)
  const wordScore = wordScoreResult?.score

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {isInvalid ? (
        <>
          <WordScoreBreakdown word={word} />
          <span className='text-red-600 text-sm font-semibold'>
            Invalid Word
          </span>
        </>
      ) : (
        <div className='flex flex-col gap-4 x items-center'>
          <WordScoreBreakdown word={word} />
          <div className='flex flex-col gap-4 x items-center'>
            <WordTypeBonus
              word={word}
              type={type}
              wordScoreResult={wordScoreResult}
            />
            <span className='flex h-10 font-bold text-lg items-center bg-gray-200 px-2 py-0.5 rounded-md'>
              {wordScore}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default PlayedWord
