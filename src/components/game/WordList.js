import React, { useState } from 'react'
import PlayedWord from '../common/PlayedWord'
import { LAYOUT_STYLES } from '../../constants/styleConstants'
import { ANIMATION_CONSTANTS } from '../../constants/cardConstants'

const WORD_LIST_STYLES = {
  CONTAINER: `${LAYOUT_STYLES.GAP_4} bg-white p-4 -mt-8 -mb-4 relative rounded-lg z-10`,
  TITLE: `text-lg font-semibold ${LAYOUT_STYLES.FLEX_CENTER} gap-2 cursor-pointer select-none`,
  WORDS_CONTAINER: `py-4 ${LAYOUT_STYLES.FLEX_COL} ${LAYOUT_STYLES.GAP_4} ${LAYOUT_STYLES.FLEX_CENTER} overflow-hidden transition-all duration-${ANIMATION_CONSTANTS.BASE_DURATION} ease-in-out`,
  CHEVRON: `w-5 h-5 transition-transform duration-${ANIMATION_CONSTANTS.BASE_DURATION} ease-in-out`,
}

const WordList = ({ allWords = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = () => {
    // setIsExpanded(!isExpanded)
  }

  return (
    <div id='playedWords' className={WORD_LIST_STYLES.CONTAINER}>
      <h3 className={WORD_LIST_STYLES.TITLE} onClick={toggleExpand}>
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
      <div
        className={`${WORD_LIST_STYLES.WORDS_CONTAINER} ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {[...allWords].reverse().map((wordObj, index) => (
          <PlayedWord
            key={index}
            word={wordObj.word}
            type={wordObj.type}
            isInvalid={!wordObj.type}
          />
        ))}
      </div>
    </div>
  )
}

export default WordList
