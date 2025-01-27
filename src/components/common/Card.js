import React, { useState, useEffect, useContext } from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle } from '../../utils/cardUtils'
import CardLayout from '../layouts/CardLayout'
import { CARD_ANIMATION } from '../../constants/cardConstants'

const Card = ({
  id,
  letter,
  type,
  isAnimating,
  isSelected,
  isNew,
  isExiting,
  onClick,
  style,
  className = '',
  index = 0,
  enable3D = CARD_ANIMATION.ENABLE_3D,
  getAnimationDuration,
}) => {
  const getAnimationClasses = () => {
    if (isExiting) return CARD_CLASSES.animation.exit
    if (isNew && !isAnimating) return CARD_CLASSES.animation.new
    if (isAnimating) return CARD_CLASSES.animation.deal
    return ''
  }

  const [dealComplete, setDealComplete] = useState(false)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const animationClass = getAnimationClasses()
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDealComplete(true)
      }, 500) // Match the dealCard animation duration
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  // Handle animation pause on key events
  useEffect(() => {
    if (enable3D && dealComplete) {
      const handleKeyEvent = e => {
        if (e.type === 'keydown') {
          setIsAnimationPaused(true)
        } else if (e.type === 'keyup') {
          setIsAnimationPaused(false)
        }
      }
      window.addEventListener('keydown', handleKeyEvent)
      window.addEventListener('keyup', handleKeyEvent)
      return () => {
        window.removeEventListener('keydown', handleKeyEvent)
        window.removeEventListener('keyup', handleKeyEvent)
      }
    }
  }, [enable3D, dealComplete])

  const handleInteraction = e => {
    e.preventDefault() // Prevent default for all events

    // Guard against undefined onClick
    if (!onClick) return

    // Only handle primary button clicks or touch events
    if ((e.type === 'click' && e.button === 0) || e.type === 'touchend') {
      onClick()
    }
  }

  return (
    <div
      onClick={handleInteraction}
      onTouchEnd={handleInteraction}
      onTouchStart={e => e.preventDefault()} // Prevent touch event from triggering click
      className={`p-1 ${getCardStyle(
        type,
      )} border border-gray-500 w-14 h-[4.5rem] rounded-lg shadow-[0px_2px_5px_1px_rgba(0,_0,_0,_0.2)] ${animationClass} ${className} ${
        enable3D && dealComplete ? 'card-3d' : ''
      }`}
      style={{
        ...style,
        '--animation-duration':
          enable3D && getAnimationDuration
            ? `${getAnimationDuration(index)}ms`
            : `0ms`,
        '--animation-play-state': isAnimationPaused ? 'paused' : 'running',
        '--tw-translate-y':
          isSelected && typeof index === 'number'
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
