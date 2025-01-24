import React, { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import Card from '../common/Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { canSelectCard, HAND_STYLES } from '../../utils/handUtils'
import { getLetterType } from '../../utils/cardUtils'
import { GAME_STATUS } from '../../constants/gameConfig'
import { ANIMATION_TIMING } from '../../constants/cardConstants'
import { calculateLetterScore } from '../../utils/scoreUtils'
import ScoreAnimation from './ScoreAnimation'
import { CONGRATULATORY_MESSAGES } from '../../constants/messageConstants'
import { CARD_CLASSES } from '../../constants/tailwindClasses'
import { CARD_TYPE } from '../../constants/cardConstants'

const CONTAINER_HEIGHT = 200
const CARD_HEIGHT = 72 // 4.5rem
const TOP_HALF_CENTER = CONTAINER_HEIGHT / 2 - CARD_HEIGHT * 1.35 // 39px
const BOTTOM_HALF_CENTER =
  CONTAINER_HEIGHT / 2 + (CONTAINER_HEIGHT / 2 - CARD_HEIGHT) // 189px

const ANIMATION_STATE = {
  NONE: 'NONE',
  ENTERING_WORD: 'ENTERING_WORD',
  EXITING_WORD: 'EXITING_WORD',
}

const HandBuilder = ({
  isValidating,
  onAnimationComplete,
  animatingIndices = [],
  forceHandAnimating = false,
}) => {
  const {
    playerHand,
    selectedCards,
    addLetter,
    removeLetter,
    gameStatus,
    clearNewFlags,
    roundScore,
    targetScore,
  } = useGame()

  const [exitingCards, setExitingCards] = useState(new Set())
  const [cardAnimationStates, setCardAnimationStates] = useState({})
  const [handAnimating, setHandAnimating] = useState(false)
  const [congratsMessage, setCongratsMessage] = useState('')
  const [congratsAnimatingIndices, setCongratsAnimatingIndices] = useState(
    new Set(),
  )

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)
  const hasAnimatingCards = animatingCards.size > 0

  // Handle round completion animations
  useEffect(() => {
    if (gameStatus === GAME_STATUS.ROUND_COMPLETE) {
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

  // Handle congratulatory message animations
  useEffect(() => {
    if (
      roundScore >= targetScore &&
      gameStatus === GAME_STATUS.ROUND_COMPLETE
    ) {
      // Wait for cards to be undealt
      const undealDelay =
        playerHand.length * ANIMATION_TIMING.CARD_STAGGER_DELAY + 500

      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * CONGRATULATORY_MESSAGES.length,
        )
        const message = CONGRATULATORY_MESSAGES[randomIndex].toUpperCase()
        setCongratsMessage(message)
        setCongratsAnimatingIndices(new Set())

        message.split('').forEach((_, index) => {
          setTimeout(() => {
            setCongratsAnimatingIndices(prev => new Set([...prev, index]))
          }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
        })
      }, undealDelay)
    } else {
      setCongratsMessage('')
      setCongratsAnimatingIndices(new Set())
    }
  }, [roundScore, targetScore, gameStatus, playerHand.length])

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
      setCardAnimationStates(prev => ({
        ...prev,
        [index]: ANIMATION_STATE.ENTERING_WORD,
      }))
      setHandAnimating(true)
      addLetter(letter, index)
    }
  }

  const handleWordCardClick = index => {
    if (!isValidating) {
      const cardIndex = selectedCards[index]
      setCardAnimationStates(prev => ({
        ...prev,
        [cardIndex]: ANIMATION_STATE.EXITING_WORD,
      }))
      // Remove this letter and all letters after it
      for (let i = 0; i < selectedCards.length - index; i++) {
        removeLetter()
      }
    }
  }

  const getHandCardPosition = (index, totalCards) => {
    const centerIndex = (totalCards - 1) / 2
    const offset = index - centerIndex

    const getResponsiveValues = () => {
      const width = window.innerWidth
      return {
        xSpacing: Math.min(width / 11, 70),
        baseScale: Math.min(width / 500, 0.95),
      }
    }

    const { xSpacing, baseScale } = getResponsiveValues()
    const xOffset = offset * xSpacing

    // Calculate vertical curve using a parabolic function
    const curveHeight = 40 // Maximum height of the curve
    const yOffset =
      ((offset * offset) / (centerIndex * centerIndex)) * curveHeight

    return {
      transform: `
        translate(calc(${xOffset}px - 50%), ${BOTTOM_HALF_CENTER - yOffset}px)
        scale(${baseScale})
      `,
    }
  }

  const getWordCardPosition = (index, totalCards) => {
    const width = window.innerWidth
    const centerIndex = (totalCards - 1) / 2
    const offset = index - centerIndex
    const xSpacing = Math.min(width / 11, 70) // Consistent spacing for word area

    return {
      transform: `
        translate(calc(${offset * xSpacing}px - 50%), ${TOP_HALF_CENTER}px)
        scale(0.95)
      `,
      zIndex: index + 1, // Ensure increasing z-index from left to right
    }
  }

  // Reset animation state when hand changes
  useEffect(() => {
    setHandAnimating(false)
  }, [playerHand])

  // Update positions on window resize
  useEffect(() => {
    const handleResize = () => {
      setExitingCards(prev => new Set([...prev]))
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle animation completion
  useEffect(() => {
    const timeouts = []
    Object.entries(cardAnimationStates).forEach(([index, state]) => {
      if (state !== ANIMATION_STATE.NONE) {
        const timeout = setTimeout(() => {
          setCardAnimationStates(prev => ({
            ...prev,
            [index]: ANIMATION_STATE.NONE,
          }))
        }, ANIMATION_TIMING.CARD_ANIMATION_DURATION)
        timeouts.push(timeout)
      }
    })
    return () => timeouts.forEach(clearTimeout)
  }, [cardAnimationStates])

  return (
    <div className='relative flex flex-col items-center'>
      {/* Cards Container */}
      <div className='relative w-full h-[200px] flex justify-center'>
        {/* Congratulatory Message */}
        {congratsMessage && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex m gap-0 z-50'>
            {congratsMessage.split('').map((letter, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  congratsAnimatingIndices.has(index)
                    ? 'opacity-100 transform scale-75'
                    : 'opacity-0 transform scale-0'
                }`}
              >
                <Card letter={letter} type={getLetterType(letter)} />
              </div>
            ))}
          </div>
        )}
        <div className='relative w-[600px] h-full'>
          {playerHand.map((card, index) => {
            const isInWord = selectedCards.includes(index)
            const nonSelectedCards = playerHand
              .map((_, i) => i)
              .filter(i => !selectedCards.includes(i))
            const handIndex = nonSelectedCards.indexOf(index)
            const wordIndex = selectedCards.indexOf(index)

            return (
              <div
                key={card.id}
                className={`absolute left-[50%] top-0 ${
                  cardAnimationStates[index] ===
                    ANIMATION_STATE.ENTERING_WORD ||
                  cardAnimationStates[index] === ANIMATION_STATE.EXITING_WORD ||
                  handAnimating ||
                  forceHandAnimating
                    ? 'transition-transform duration-300'
                    : 'duration-0'
                }`}
                style={
                  isInWord
                    ? getWordCardPosition(wordIndex, selectedCards.length)
                    : getHandCardPosition(handIndex, nonSelectedCards.length)
                }
                onClick={() =>
                  isInWord
                    ? handleWordCardClick(wordIndex)
                    : handleCardClick(card.letter, index)
                }
              >
                {isInWord && animatingIndices.includes(wordIndex) && (
                  <ScoreAnimation
                    score={calculateLetterScore(card.letter)}
                    onComplete={() => {
                      if (wordIndex === selectedCards.length - 1) {
                        onAnimationComplete()
                      }
                    }}
                  />
                )}
                <Card
                  id={card.id}
                  letter={card.letter}
                  type={card.type}
                  isAnimating={animatingCards.has(index)}
                  isNew={card.isNew}
                  isExiting={exitingCards.has(index)}
                  className={isValidating ? HAND_STYLES.DISABLED : ''}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HandBuilder
