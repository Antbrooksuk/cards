import React from 'react'
import Button from '../common/Button'
import ScoreDisplay from '../common/ScoreDisplay'

const RoundEnd = ({
  words,
  roundScore,
  totalScore,
  roundNumber,
  targetScore,
  onNextRound,
  className = '',
}) => {
  return (
    <div
      className={`game-container min-h-screen flex flex-col items-center justify-center py-8 ${className}`}
    >
      <h2 className='text-3xl font-bold mb-6'>Round {roundNumber} Complete!</h2>

      <div className='bg-white rounded-lg shadow-md p-6 w-full max-w-2xl'>
        <div className='flex justify-around mb-8'>
          <ScoreDisplay label='Round Score' score={roundScore} />
          <ScoreDisplay
            label='Total Score'
            score={totalScore}
            targetScore={targetScore}
          />
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-semibold mb-3'>
            Words Found ({words.length})
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {words.map((word, index) => (
              <div
                key={index}
                className='bg-gray-100 rounded px-3 py-1 text-sm flex items-center justify-between'
              >
                <span>{typeof word === 'string' ? word : word.word}</span>
                {typeof word === 'object' && word.type && (
                  <span className='px-2 py-0.5 bg-gray-200 rounded-full text-xs'>
                    {word.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <Button onClick={onNextRound} className='w-full text-lg py-3'>
          {roundNumber >= 3 ? 'See Final Score' : 'Next Round'}
        </Button>
      </div>
    </div>
  )
}

export default RoundEnd
