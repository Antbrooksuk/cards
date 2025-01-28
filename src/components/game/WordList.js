import React, { useState } from 'react'
import PlayedWord from '../common/PlayedWord'
import { LAYOUT_STYLES } from '../../constants/styleConstants'
import { ANIMATION_CONSTANTS } from '../../constants/cardConstants'

const WordList = ({ allWords = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = () => {
    // setIsExpanded(!isExpanded)
  }

  return (
    <div className='played-words'>
      <h3 className='font-semibold' onClick={toggleExpand}>
        {/* <svg
          className={`${WORD_LIST_STYLES.CHEVRON} ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg> */}
        Played Words ({allWords.length})
      </h3>
      <ul>
        {[...allWords].reverse().map((wordObj, index) => (
          <PlayedWord
            key={index}
            word={wordObj.word}
            type={wordObj.type}
            isInvalid={!wordObj.type}
          />
        ))}
      </ul>
    </div>
  )
}

export default WordList
