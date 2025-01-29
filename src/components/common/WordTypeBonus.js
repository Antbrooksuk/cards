import React from 'react'
import {
  getSpecialWordBonus,
  calculateLetterScore,
} from '../../utils/scoreUtils'
import { WORD_TYPE_MULTIPLIER } from '../../constants/wordConstants'

const WordTypeBonus = ({ word, type, wordScoreResult }) => {
  const specialBonus = getSpecialWordBonus(wordScoreResult)
  const totalLetterScore = word
    .split('')
    .reduce((total, letter) => total + calculateLetterScore(letter), 0)

  return (
    <div className='flex flex-col'>
      <span>'{word}'</span>
      <span className='breakdown'>word score: {totalLetterScore}</span>
      <span className='breakdown'>letters × {word.length}</span>
      <span className='breakdown'>
        {type} × {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']}
      </span>
      {specialBonus && (
        <>
          <span className='breakdown'>
            {specialBonus.text} × {specialBonus.multiplier}
          </span>
        </>
      )}
    </div>
  )
}

export default WordTypeBonus
