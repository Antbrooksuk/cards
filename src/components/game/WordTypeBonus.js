import React from 'react'
import { getWordTypeStyle, getSpecialWordBonus } from '../../utils/scoreUtils'
import { getWordLengthClass } from '../../utils/cardUtils'
import { WORD_TYPE_MULTIPLIER } from '../../constants/wordConstants'

const WordTypeBonus = ({ word, type, wordScoreResult }) => {
  const typeColor = getWordTypeStyle(type, false)
  const wordLengthClass = getWordLengthClass(word.length)
  const specialBonus = getSpecialWordBonus(wordScoreResult)

  return (
    <div className='flex items-center gap-4 text-sm'>
      <span
        className={`flex h-10 font-bold text-md items-center ${wordLengthClass} px-2 py-0.5 rounded-md`}
      >
        LETTERS × {word.length}
      </span>
      <span
        className={`flex h-10 font-bold text-md items-center ${typeColor} px-2 py-0.5 rounded-md`}
      >
        {type.toUpperCase()} ×{' '}
        {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']}
      </span>
      {specialBonus && (
        <>
          <span
            className={`flex h-10 font-bold text-md items-center ${specialBonus.style.COLOR} px-2 py-0.5 rounded-md`}
          >
            {specialBonus.text} × {specialBonus.multiplier}
          </span>
        </>
      )}
    </div>
  )
}

export default WordTypeBonus
