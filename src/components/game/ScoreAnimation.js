import React, { useEffect } from 'react'

const ScoreAnimation = ({ score, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 1000) // Animation duration

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div
      className='absolute -top-8 text-2xl font-bold text-green-600 animate-float'
      style={{
        animation: 'float 1s ease-out forwards',
      }}
    >
      +{score}
    </div>
  )
}

export default ScoreAnimation
