import React from 'react'
import { calculateWordTotalScore } from '../../utils/scoreUtils'
import WordScoreBreakdown from './WordScoreBreakdown'
import WordTypeBonus from './WordTypeBonus'

const PlayedWord = ({ word, type, isInvalid = false, className = '' }) => {
  const wordScoreResult = isInvalid ? null : calculateWordTotalScore(word, type)
  const wordScore = wordScoreResult?.score

  return (
    <div
      className={`bg-gray-100 rounded-lg px-3 py-2 flex items-center gap-3 ${className}`}
    >
      {isInvalid ? (
        <div className='flex items-center'>
          <WordScoreBreakdown word={word} />
          <span className='text-red-600 text-sm font-semibold ml-2'>
            Invalid Word
          </span>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <WordScoreBreakdown word={word} />
          <span>x</span>
          <WordTypeBonus
            word={word}
            type={type}
            wordScoreResult={wordScoreResult}
          />
          <span>=</span>
          <span className='flex h-10 font-bold text-lg items-center bg-gray-200 px-2 py-0.5 rounded-md'>
            {wordScore}
          </span>
        </div>
      )}
    </div>
  )
}

export default PlayedWord
