import React, { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import Card from '../common/Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { HAND_STYLES } from '../../utils/handUtils'
import { getHandCardStyles, getHandCardClassNames } from '../../utils/cardUtils'
import { GAME_STATUS } from '../../constants/gameConstants'
import {
  ANIMATION_TIMING,
  ANIMATION_STATE,
} from '../../constants/cardConstants'
import {
  handleCardClick,
  handleWordCardClick,
} from '../../utils/cardEventUtils'
import { calculateLetterScore } from '../../utils/scoreUtils'
import ScoreAnimation from '../common/ScoreAnimation'
import CongratsMessage from '../common/CongratsMessage'
import { CONGRATULATORY_MESSAGES } from '../../constants/messageConstants'
import { LAYOUT_DIMENSIONS } from '../../constants/styleConstants'
import {
  handleCardExitAnimation,
  getHandCardPosition,
  getWordCardPosition,
} from '../../utils/animationUtils'
import { handleCongratsAnimation } from '../../utils/congratsAnimationUtils'

const HandBuilder = ({
  isValidating,
  setHandAnimating,
  handAnimating,
  onAnimationComplete,
  animatingIndices = [],
  isAnimating = false,
  debugMode,
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
  const [congratsMessage, setCongratsMessage] = useState('')
  const [congratsAnimatingIndices, setCongratsAnimatingIndices] = useState(
    new Set(),
  )
  const [congratsPositions, setCongratsPositions] = useState([])

  const { animatingCards, getAnimationDuration, isDealing } = useCardAnimation(
    playerHand,
    clearNewFlags,
  )
  const hasAnimatingCards = animatingCards.size > 0

  // Handle round completion animations
  useEffect(() => {
    if (gameStatus === GAME_STATUS.ROUND_COMPLETE) {
      playerHand.forEach((_, index) => {
        handleCardExitAnimation(playerHand, setExitingCards, index)
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
        playerHand.length * ANIMATION_TIMING.CARD_STAGGER_DELAY +
        ANIMATION_TIMING.UNDEAL_DELAY_BUFFER

      setTimeout(() => {
        const randomIndex = Math.floor(
          Math.random() * CONGRATULATORY_MESSAGES.length,
        )
        const message = CONGRATULATORY_MESSAGES[randomIndex].toUpperCase()
        handleCongratsAnimation(
          message,
          setCongratsMessage,
          setCongratsAnimatingIndices,
          setCongratsPositions,
        )
      }, undealDelay)
    } else {
      setCongratsMessage('')
      setCongratsAnimatingIndices(new Set())
    }
  }, [roundScore, targetScore, gameStatus, playerHand.length])

  // Reset hand animation state when hand changes
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
      <div
        className='relative w-full'
        style={{ height: `${LAYOUT_DIMENSIONS.CONTAINER_HEIGHT}px` }}
      >
        {/* Congratulatory Message */}
        {congratsMessage && (
          <div className='absolute inset-0'>
            <CongratsMessage
              message={congratsMessage}
              animatingIndices={congratsAnimatingIndices}
              positions={congratsPositions}
            />
          </div>
        )}
        <div className='relative mx-auto h-full'>
          {playerHand.map((card, index) => {
            const isInWord = selectedCards.includes(index)
            const nonSelectedCards = playerHand
              .map((_, i) => i)
              .filter(i => !selectedCards.includes(i))
            let handIndex = nonSelectedCards.indexOf(index)
            const wordIndex = selectedCards.indexOf(index)

            return (
              <div
                key={card.id}
                className={getHandCardClassNames({
                  isInWord,
                  isAnimating: animatingCards.has(index),
                  cardAnimationState: cardAnimationStates[index],
                  handAnimating,
                  isDealing,
                  gameStatus,
                })}
                style={{
                  ...(isInWord
                    ? getWordCardPosition(wordIndex, selectedCards.length)
                    : getHandCardPosition(handIndex, nonSelectedCards.length)),
                  ...getHandCardStyles({
                    index,
                    totalCards: nonSelectedCards.length,
                    isAnimating: animatingCards.has(index),
                    isDealing,
                    handAnimating,
                  }),
                }}
                onClick={e => {
                  // Only handle primary button clicks
                  if (e.button !== 0 || debugMode) return

                  // Prevent event from reaching the Card component
                  e.stopPropagation()

                  isInWord
                    ? handleWordCardClick(wordIndex, {
                        isValidating,
                        selectedCards,
                        setCardAnimationStates,
                        removeLetter,
                        gameStatus,
                      })
                    : handleCardClick(card.letter, index, {
                        selectedCards,
                        gameStatus,
                        isValidating,
                        hasAnimatingCards,
                        setCardAnimationStates,
                        setHandAnimating,
                        addLetter,
                        isAnimating: animatingCards.has(index) || isAnimating,
                      })
                }}
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
                  isSelected={selectedCards.includes(index)}
                  isExiting={exitingCards.has(index)}
                  className={isValidating ? HAND_STYLES.DISABLED : ''}
                  index={isInWord ? wordIndex : undefined}
                  getAnimationDuration={getAnimationDuration}
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
