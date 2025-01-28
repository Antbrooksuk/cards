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
      className='absolute text-center left-[50%] -translate-x-1/2 -top-8 text-2xl font-bold text-white animate-float'
      style={{
        animation: 'float 1s ease-out forwards',
      }}
    >
      +{score}
    </div>
  )
}

export default ScoreAnimation
