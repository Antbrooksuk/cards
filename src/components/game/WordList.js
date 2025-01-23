import React from 'react'
import PlayedWord from './PlayedWord'

const WORD_LIST_STYLES = {
  CONTAINER: 'gap-4 p-4 border bg-gray-100 rounded-lg',
  TITLE: 'text-lg font-semibold mb-2',
  WORDS_CONTAINER: 'flex flex-col gap-3',
}

const WordList = ({ words = [], invalidWords = [] }) => {
  const totalWords = words.length + invalidWords.length

  return (
    <div className={WORD_LIST_STYLES.CONTAINER}>
      <h3 className={WORD_LIST_STYLES.TITLE}>Played Words ({totalWords})</h3>
      <div className={WORD_LIST_STYLES.WORDS_CONTAINER}>
        {words.map((wordObj, index) => (
          <PlayedWord
            key={`valid-${index}`}
            word={wordObj.word}
            type={wordObj.type}
          />
        ))}
        {invalidWords.map((wordObj, index) => (
          <PlayedWord
            key={`invalid-${index}`}
            word={typeof wordObj === 'string' ? wordObj : wordObj.word}
            isInvalid={true}
          />
        ))}
      </div>
    </div>
  )
}

export default WordList
