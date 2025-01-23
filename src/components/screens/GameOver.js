import React from 'react'
import Button from '../common/Button'
import ScoreDisplay from '../common/ScoreDisplay'

const GameOver = ({ finalScore, totalWords, onPlayAgain, className = '' }) => {
  return (
    <div
      className={`game-container min-h-screen flex flex-col items-center justify-center py-8 ${className}`}
    >
      <h1 className='text-4xl font-bold mb-2'>Game Over!</h1>
      <h2 className='text-2xl text-gray-600 mb-8'>Well played!</h2>

      <div className='bg-white rounded-lg shadow-md p-6 w-full max-w-md'>
        <div className='text-center mb-8'>
          <ScoreDisplay
            label='Final Score'
            score={finalScore}
            className='mb-4'
          />
          <div className='text-lg text-gray-600'>
            Total Words Found:{' '}
            <span className='font-semibold'>{totalWords}</span>
          </div>
        </div>

        <Button onClick={onPlayAgain} className='w-full text-lg py-3'>
          Play Again
        </Button>
      </div>
    </div>
  )
}

export default GameOver
