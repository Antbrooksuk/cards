import React from 'react'

const ScoreDisplay = ({
  score,
  targetScore,
  label = 'Score',
  className = '',
}) => {
  return (
    <div className={`text-center ${className}`}>
      <div className='text-lg font-semibold text-gray-600'>{label}</div>
      <div className='text-3xl font-bold'>
        <span className='text-blue-600'>{score}</span>
        {targetScore && (
          <>
            <span className='text-gray-400'>/</span>
            <span className='text-green-600'>{targetScore}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default ScoreDisplay
