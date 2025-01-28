import React from 'react'
import {
  getWordTypeStyle,
  getSpecialWordBonus,
  calculateLetterScore,
} from '../../utils/scoreUtils'
import { getWordLengthClass } from '../../utils/cardUtils'
import { WORD_TYPE_MULTIPLIER } from '../../constants/wordConstants'

const WordTypeBonus = ({ word, type, wordScoreResult }) => {
  const typeColor = getWordTypeStyle(type, false)
  const wordLengthClass = getWordLengthClass(word.length)
  const specialBonus = getSpecialWordBonus(wordScoreResult)
  const totalLetterScore = word
    .split('')
    .reduce((total, letter) => total + calculateLetterScore(letter), 0)

  return (
    <div className='flex flex-col'>
      <span>'{word}'</span>
      <span className='breakdown'>(WORD SCORE: {totalLetterScore})</span>
      <span className='breakdown'>(LETTERS × {word.length})</span>
      <span className='breakdown'>
        ({type.toUpperCase()} ×{' '}
        {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']})
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
