import React from 'react'
import PlayedWord from '../common/PlayedWord'

const WORD_LIST_STYLES = {
  CONTAINER: 'gap-4 p-4 border bg-gray-100 rounded-lg',
  TITLE: 'text-lg font-semibold mb-2',
  WORDS_CONTAINER: 'flex flex-col gap-3',
}

const WordList = ({ allWords = [] }) => {
  return (
    <div id='playedWords' className={WORD_LIST_STYLES.CONTAINER}>
      <h3 className={WORD_LIST_STYLES.TITLE}>
        Played Words ({allWords.length})
      </h3>
      <div className={WORD_LIST_STYLES.WORDS_CONTAINER}>
        {allWords.map((wordObj, index) => (
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
