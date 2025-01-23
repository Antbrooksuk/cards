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
        {words.length > 0 && (
          <div className='gap-4 p-4 border bg-gray-100 rounded-lg'>
            <h3 className='text-lg font-semibold mb-2'>
              Valid Words ({words.length})
            </h3>
            <div className='gap-2'>
              {words.map((wordObj, index) => (
                <PlayedWord
                  key={index}
                  word={wordObj.word}
                  type={wordObj.type}
                />
              ))}
            </div>
          </div>
        )}
        {invalidWords.length > 0 && (
          <div className='gap-4 p-4 border bg-gray-100 rounded-lg'>
            <h3 className='text-lg font-semibold mb-2'>
              Invalid Words ({invalidWords.length})
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {invalidWords.map((wordObj, index) => (
                <div
                  key={index}
                  className='bg-red-50 rounded px-3 py-1 text-sm text-red-800'
                >
                  {typeof wordObj === 'string' ? wordObj : wordObj.word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameBoard
