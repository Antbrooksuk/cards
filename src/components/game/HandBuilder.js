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
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleDragStart,
  handleDrag,
  handleDragEnd,
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
    reorderHand,
  } = useGame()

  const [exitingCards, setExitingCards] = useState(new Set())
  const [cardAnimationStates, setCardAnimationStates] = useState({})
  const [handAnimating, setHandAnimating] = useState(false)
  const [congratsMessage, setCongratsMessage] = useState('')
  const [congratsAnimatingIndices, setCongratsAnimatingIndices] = useState(
    new Set(),
  )
  const [congratsPositions, setCongratsPositions] = useState([])
  const [draggedCard, setDraggedCard] = useState(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartIndex, setDragStartIndex] = useState(null)
  const [dropPreviewIndex, setDropPreviewIndex] = useState(null)
  const [touchStartTime, setTouchStartTime] = useState(null)
  const [touchMoved, setTouchMoved] = useState(false)

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

            // Adjust indices during drag preview
            if (
              draggedCard !== null &&
              dropPreviewIndex !== null &&
              !isInWord
            ) {
              const currentDragIndex = nonSelectedCards.indexOf(draggedCard)
              if (handIndex === currentDragIndex) {
                handIndex = dropPreviewIndex
              } else if (
                currentDragIndex < dropPreviewIndex &&
                handIndex > currentDragIndex &&
                handIndex <= dropPreviewIndex
              ) {
                handIndex--
              } else if (
                currentDragIndex > dropPreviewIndex &&
                handIndex < currentDragIndex &&
                handIndex >= dropPreviewIndex
              ) {
                handIndex++
              }
            }

            return (
              <div
                key={card.id}
                className={getHandCardClassNames({
                  isInWord,
                  isDragged: draggedCard === index,
                  isAnimating: animatingCards.has(index),
                  cardAnimationState: cardAnimationStates[index],
                  handAnimating,
                  forceHandAnimating,
                  isDealing,
                })}
                style={{
                  ...(isInWord
                    ? getWordCardPosition(wordIndex, selectedCards.length)
                    : getHandCardPosition(handIndex, nonSelectedCards.length)),
                  ...getHandCardStyles({
                    index,
                    totalCards: nonSelectedCards.length,
                    isDragged: draggedCard === index,
                    isAnimating: animatingCards.has(index),
                    isDealing,
                    handAnimating,
                    forceHandAnimating,
                  }),
                }}
                draggable={!isInWord && !isValidating}
                onDragStart={e =>
                  handleDragStart(e, index, {
                    isInWord,
                    isValidating,
                    playerHand,
                    selectedCards,
                    setDraggedCard,
                    setDragStartX,
                    setDragStartIndex,
                    setDropPreviewIndex,
                  })
                }
                onDrag={e =>
                  handleDrag(e, {
                    draggedCard,
                    isInWord,
                    dragStartIndex,
                    dragStartX,
                    playerHand,
                    selectedCards,
                    dropPreviewIndex,
                    setDropPreviewIndex,
                  })
                }
                onDragEnd={() =>
                  handleDragEnd({
                    draggedCard,
                    dropPreviewIndex,
                    playerHand,
                    selectedCards,
                    reorderHand,
                    setDraggedCard,
                    setDragStartIndex,
                    setDropPreviewIndex,
                  })
                }
                onClick={e => {
                  // Only handle click events that aren't from touch events
                  if (e.detail === 0 || e.pointerType === 'touch') {
                    return
                  }
                  // console.log('onClick:', {
                  //   letter: card.letter,
                  //   index,
                  //   source: 'mouse',
                  //   timestamp: Date.now(),
                  // })
                  isInWord
                    ? handleWordCardClick(wordIndex, {
                        isValidating,
                        selectedCards,
                        setCardAnimationStates,
                        removeLetter,
                      })
                    : handleCardClick(card.letter, index, {
                        selectedCards,
                        gameStatus,
                        isValidating,
                        hasAnimatingCards,
                        setCardAnimationStates,
                        setHandAnimating,
                        addLetter,
                      })
                }}
                onTouchStart={e =>
                  handleTouchStart(e, card, index, {
                    isInWord,
                    isValidating,
                    playerHand,
                    selectedCards,
                    setTouchStartTime,
                    setDragStartX,
                    setDragStartY,
                    setTouchMoved,
                    setDragStartIndex,
                  })
                }
                onTouchMove={e =>
                  handleTouchMove(e, {
                    isInWord,
                    isValidating,
                    dragStartIndex,
                    dragStartX,
                    dragStartY,
                    playerHand,
                    selectedCards,
                    index,
                    draggedCard,
                    dropPreviewIndex,
                    setTouchMoved,
                    setDraggedCard,
                    setDropPreviewIndex,
                  })
                }
                onTouchEnd={e =>
                  handleTouchEnd(e, card, index, {
                    touchMoved,
                    touchStartTime,
                    isInWord,
                    draggedCard,
                    dropPreviewIndex,
                    playerHand,
                    selectedCards,
                    setTouchMoved,
                    setDraggedCard,
                    setDragStartIndex,
                    setDropPreviewIndex,
                    reorderHand,
                  })
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
                  isSelected={selectedCards.includes(index)}
                  isExiting={exitingCards.has(index)}
                  className={isValidating ? HAND_STYLES.DISABLED : ''}
                  onClick={() => {
                    if (isInWord) {
                      handleWordCardClick(wordIndex, {
                        isValidating,
                        selectedCards,
                        setCardAnimationStates,
                        removeLetter,
                      })
                    } else {
                      handleCardClick(card.letter, index, {
                        selectedCards,
                        gameStatus,
                        isValidating,
                        hasAnimatingCards,
                        setCardAnimationStates,
                        setHandAnimating,
                        addLetter,
                      })
                    }
                  }}
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
