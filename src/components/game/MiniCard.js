import React from 'react'
import { calculateLetterScore } from '../../utils/cardUtils'
import {
  CARD_TYPE,
  LEGENDARY_LETTERS,
  EPIC_CONSONANTS,
  RARE_CONSONANTS,
  UNCOMMON_CONSONANTS,
  VOWELS,
} from '../../constants/gameConfig'

const MiniCard = ({ letter }) => {
  const getCardStyle = () => {
    const upperLetter = letter.toUpperCase()
    if (LEGENDARY_LETTERS.includes(upperLetter))
      return 'bg-orange-500 text-white'
    if (EPIC_CONSONANTS.includes(upperLetter)) return 'bg-purple-500 text-white'
    if (RARE_CONSONANTS.includes(upperLetter)) return 'bg-blue-500 text-white'
    if (UNCOMMON_CONSONANTS.includes(upperLetter))
      return 'bg-green-500 text-white'
    if (VOWELS.includes(upperLetter)) return 'bg-white text-gray-800'
    return 'bg-gray-500 text-white'
  }

  return (
    <div
      className={`${getCardStyle()} font-bold w-8 h-10 rounded shadow-sm flex items-center justify-center`}
    >
      <div className='relative w-full h-full flex flex-col items-center justify-center'>
        <span className='text-lg'>{letter}</span>
        <span className='text-[10px] absolute bottom-0.5 right-0.5 opacity-75'>
          {calculateLetterScore(letter)}
        </span>
      </div>
    </div>
  )
}

export default MiniCard
