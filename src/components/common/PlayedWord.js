import React from 'react'
import { calculateWordTotalScore } from '../../utils/scoreUtils'
import WordTypeBonus from './WordTypeBonus'

const PlayedWord = ({ word, type, isInvalid = false }) => {
  const wordScoreResult = isInvalid ? null : calculateWordTotalScore(word, type)
  const wordScore = wordScoreResult?.score

  return (
    <>
      {isInvalid ? (
        <li>
          <div className='flex flex-col'>
            <span>'{word}'</span>
            <span className='breakdown invalid'>Invalid Word</span>
          </div>
        </li>
      ) : (
        <li>
          <WordTypeBonus
            word={word}
            type={type}
            wordScoreResult={wordScoreResult}
          />
          <span className='breakdown total'>total --> {wordScore}</span>
        </li>
      )}
    </>
  )
}

export default PlayedWord
