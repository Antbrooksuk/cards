import React, { useState, useEffect } from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle } from '../../utils/cardUtils'
import CardLayout from '../layouts/CardLayout'
import { CARD_ANIMATION } from '../../constants/cardConstants'

const Card = ({
  id,
  letter,
  type,
  isSelected,
  isAnimating,
  isNew,
  isExiting,
  onClick,
  style,
  className = '',
  index = 0,
  enable3D = CARD_ANIMATION.ENABLE_3D,
}) => {
  const getAnimationClasses = () => {
    if (isExiting) return CARD_CLASSES.animation.exit
    if (isNew && !isAnimating) return CARD_CLASSES.animation.new
    if (isAnimating) return CARD_CLASSES.animation.deal
    return ''
  }

  const [dealComplete, setDealComplete] = useState(false)
  const animationClass = getAnimationClasses()

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDealComplete(true)
      }, 500) // Match the dealCard animation duration
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  const handleInteraction = e => {
    // Prevent double-firing of events on touch devices
    if (!onClick) return // Guard against undefined onClick

    if (e.type === 'touchend') {
      e.preventDefault()
      onClick()
    } else if (e.type === 'click' && !e.touches) {
      // Only handle click events if they're not from touch
      onClick()
    }
  }
  return (
    <div
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
      className={`p-1 ${getCardStyle(
        type,
        isSelected,
      )} border border-gray-500 w-14 h-[4.5rem] rounded-lg shadow-[0px_2px_5px_1px_rgba(0,_0,_0,_0.2)] ${animationClass} ${className} ${
        enable3D && dealComplete ? 'card-3d' : ''
      }`}
      style={{
        ...style,
        '--animation-delay': enable3D ? `${Math.random() * 250}ms` : `0ms`,
        '--tw-translate-y':
          typeof index === 'number'
            ? index % 2 === 0
              ? '4px'
              : '-4px'
            : '0px',
      }}
    >
      <div
        className={`${CARD_CLASSES.inner.base} ${
          CARD_CLASSES.inner[type.toLowerCase()]
        }`}
      >
        <CardLayout
          id={id}
          letter={letter}
          score={calculateLetterScore(letter)}
        />
      </div>
    </div>
  )
}

export default Card
