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
        {allWords.length === 0
          ? `Get started`
          : `Played Words ${allWords.length}`}
      </h3>
      {allWords.length === 0 ? (
        <ul>
          <li>
            <div>
              <span>Try to make a word from the letters in your hand.</span>
            </div>
            <div>
              <span className='breakdown'>
                You can discard up to 9 letters per round.
              </span>
            </div>
            <div>
              <span className='breakdown'>
                You have 5 plays to reach the round target.
              </span>
            </div>
            <div>
              <span className='breakdown'>
                You can randomise your hand with the shuffle button.
              </span>
            </div>
            <div>
              <span className='breakdown'>
                If you don't make the target score its game over!
              </span>
            </div>
          </li>
        </ul>
      ) : (
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
      )}
    </div>
  )
}

export default WordList
