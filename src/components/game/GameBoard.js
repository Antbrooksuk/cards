import React from 'react'
import ScoreDisplay from '../common/ScoreDisplay'
import PlayedWord from './PlayedWord'

const GameBoard = ({
  words = [],
  invalidWords = [],
  score,
  roundScore,
  roundNumber,
  targetScore,
}) => {
  return (
    <div className={`game-container`}>
      <div className='flex justify-between items-center mb-6'>
        <div className='text-xl font-bold'>Round {roundNumber}</div>
        <div className='flex gap-8'>
          <ScoreDisplay
            score={roundScore}
            label='Round Score'
            targetScore={targetScore}
          />
          <ScoreDisplay score={score} label='Total Score' />
        </div>
      </div>

      <div className='space-y-4'>
        <div className='gap-4 p-4 border bg-gray-100 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>
            Played Words ({words.length + invalidWords.length})
          </h3>
          <div className='flex flex-col gap-3'>
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
      </div>
    </div>
  )
}

export default GameBoard
