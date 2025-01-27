import React, { useEffect, useState, memo } from 'react'

const AnimatedScoreDisplay = ({ score, targetScore, label = 'Score' }) => {
  const currentScore =
    Number(typeof score === 'object' ? score.score : score) || 0
  const [prevScore, setPrevScore] = useState(currentScore)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (currentScore !== prevScore) {
      // First set the starting point
      setPrevScore(prev => {
        if (prev === currentScore) return prev
        setShouldAnimate(true)
        return prev
      })

      // Handle animation completion
      const timer = setTimeout(() => {
        setShouldAnimate(false)
        setPrevScore(currentScore)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [currentScore, prevScore])

  return (
    <div className={`text-left flex-1`}>
      <div className='text-lg font-semibold text-gray-600'>{label}</div>
      <div className='text-3xl font-bold flex'>
        <div
          className={`animated-score text-blue-600 ${
            shouldAnimate ? 'animate' : ''
          }`}
          style={{
            '--prev-num': prevScore,
            '--current-num': currentScore,
          }}
        />
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

const MemoizedAnimatedScoreDisplay = memo(AnimatedScoreDisplay)
export default MemoizedAnimatedScoreDisplay
