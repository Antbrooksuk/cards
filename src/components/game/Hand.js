import React, { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import Card from '../common/Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { canSelectCard, HAND_STYLES } from '../../utils/handUtils'
import { GAME_STATUS } from '../../constants/gameConfig'
import { ANIMATION_TIMING } from '../../constants/cardConstants'

const Hand = ({ isValidating }) => {
  const { playerHand, selectedCards, addLetter, gameStatus, clearNewFlags } =
    useGame()
  const [exitingCards, setExitingCards] = useState(new Set())

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)
  const hasAnimatingCards = animatingCards.size > 0

  useEffect(() => {
    if (gameStatus === GAME_STATUS.ROUND_COMPLETE) {
      // Start exit animations in reverse order
      playerHand.forEach((_, index) => {
        setTimeout(() => {
          setExitingCards(
            prev => new Set([...prev, playerHand.length - 1 - index]),
          )
        }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
      })
    } else {
      setExitingCards(new Set())
    }
  }, [gameStatus, playerHand.length])
  const handleCardClick = (letter, index) => {
    if (
      canSelectCard(
        index,
        selectedCards,
        gameStatus,
        isValidating,
        hasAnimatingCards,
      )
    ) {
      addLetter(letter, index)
    }
  }

  const getCardPosition = (index, totalCards) => {
    const centerIndex = (totalCards - 1) / 2
    const offset = index - centerIndex

    // Responsive values based on screen width
    const getResponsiveValues = () => {
      const width = window.innerWidth
      if (width < 640) {
        // sm
        return {
          xSpacing: 32,
          yOffset: 0.8,
          baseScale: 0.85,
          yBase: 18,
          spreadFactor: 1.2, // Controls how much cards spread during shuffle
        }
      } else if (width < 768) {
        // md
        return {
          xSpacing: 38,
          yOffset: 1.0,
          baseScale: 0.9,
          yBase: 20,
          spreadFactor: 1.4,
        }
      } else {
        // lg and above
        return {
          xSpacing: 44,
          yOffset: 1.2,
          baseScale: 0.95,
          yBase: 22,
          spreadFactor: 1.6,
        }
      }
    }

    const { xSpacing, yOffset, baseScale, yBase, spreadFactor } =
      getResponsiveValues()

    // Add some randomness to the spread during shuffle animation
    const shuffleRandomness = animatingCards.has(index)
      ? {
          x: Math.sin(index * 0.5) * 15,
          y: Math.cos(index * 0.7) * 10,
          rotate: (Math.random() - 0.5) * 20,
        }
      : { x: 0, y: 0, rotate: 0 }

    const xOffset =
      offset * xSpacing * (animatingCards.has(index) ? spreadFactor : 1)
    const yOffsetValue = -Math.pow(offset / (totalCards / 4), 2) * yOffset * 8

    return {
      transform: `
        translateX(${xOffset + shuffleRandomness.x}px)
        translateY(calc(${yBase}px + ${yOffsetValue + shuffleRandomness.y}px))
        rotate(${shuffleRandomness.rotate}deg)
        scale(${baseScale})
      `,
      zIndex: totalCards - Math.abs(offset),
      transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  }

  // Update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render to update card positions
      setExitingCards(prev => new Set([...prev]))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div id='hand' className={HAND_STYLES.CONTAINER}>
      {playerHand.map((card, index) => (
        <div
          key={card.id}
          className={HAND_STYLES.CARD_WRAPPER}
          style={getCardPosition(index, playerHand.length)}
        >
          <Card
            id={card.id}
            letter={card.letter}
            type={card.type}
            isSelected={selectedCards.includes(index)}
            isAnimating={animatingCards.has(index)}
            isNew={card.isNew}
            isExiting={exitingCards.has(index)}
            onClick={() => handleCardClick(card.letter, index)}
            className={isValidating ? HAND_STYLES.DISABLED : ''}
          />
        </div>
      ))}
    </div>
  )
}

export default Hand
