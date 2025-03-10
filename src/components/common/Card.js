import React, { useState, useEffect } from 'react'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { CARD_CLASSES } from '../../constants/tailwindClasses'
import { getCardStyle } from '../../utils/cardUtils'
import CardLayout from '../layouts/CardLayout'
import {
  CARD_ANIMATION,
  ANIMATION_CONSTANTS,
} from '../../constants/cardConstants'

const Card = ({
  id,
  letter,
  type,
  isAnimating,
  isSelected,
  isNew,
  isExiting,
  style,
  className = '',
  index = 0,
  enable3D = CARD_ANIMATION.ENABLE_3D,
  getAnimationDuration,
  onClick,
}) => {
  const getAnimationClasses = () => {
    if (isExiting) return CARD_CLASSES.animation.exit
    if (isNew && !isAnimating) return CARD_CLASSES.animation.new
    if (isAnimating) return CARD_CLASSES.animation.deal
    return ''
  }

  const [dealComplete, setDealComplete] = useState(false)
  const animationClass = getAnimationClasses()

  // Handle existing cards loaded from cache
  useEffect(() => {
    if (!isNew && !isAnimating) {
      setDealComplete(true)
    }
  }, [isNew, isAnimating])

  // Handle deal animation completion
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDealComplete(true)
      }, ANIMATION_CONSTANTS.CARD_ANIMATION_DURATION)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <div
      role='button'
      tabIndex={0}
      aria-pressed={isSelected}
      className={`p-1 ${CARD_CLASSES.base}
      ${getCardStyle(type)}  ${animationClass} ${className} ${
        enable3D && dealComplete ? 'card-3d' : ''
      }`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.(e)
        }
      }}
      onClick={onClick}
      style={{
        ...style,
        '--animation-duration':
          enable3D && getAnimationDuration
            ? `${getAnimationDuration(index)}ms`
            : `0ms`,
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
