import React, { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import Card from '../common/Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { canSelectCard, HAND_STYLES } from '../../utils/handUtils'
import { getLetterType } from '../../utils/cardUtils'
import { GAME_STATUS } from '../../constants/gameConstants'
import {
  ANIMATION_TIMING,
  ANIMATION_STATE,
  CARD_ANIMATION,
  ANIMATION_CONSTANTS,
} from '../../constants/cardConstants'
import { calculateLetterScore } from '../../utils/scoreUtils'
import ScoreAnimation from '../common/ScoreAnimation'
import { CONGRATULATORY_MESSAGES } from '../../constants/messageConstants'
import { LAYOUT_DIMENSIONS } from '../../constants/styleConstants'
import {
  handleCongratsAnimation,
  handleCardExitAnimation,
  getHandCardPosition,
  getWordCardPosition,
  getResponsiveValues,
} from '../../utils/animationUtils'

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
  const [draggedCard, setDraggedCard] = useState(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragStartIndex, setDragStartIndex] = useState(null)
  const [dropPreviewIndex, setDropPreviewIndex] = useState(null)
  const [touchStartTime, setTouchStartTime] = useState(null)
  const [touchMoved, setTouchMoved] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const TOUCH_MOVE_THRESHOLD = 10 // pixels
  const TOUCH_TIME_THRESHOLD = 200 // milliseconds

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)
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
        )
      }, undealDelay)
    } else {
      setCongratsMessage('')
      setCongratsAnimatingIndices(new Set())
    }
  }, [roundScore, targetScore, gameStatus, playerHand.length])

  const handleCardClick = (letter, index) => {
    console.log('handleCardClick:', { letter, index })
    if (
      canSelectCard(
        index,
        selectedCards,
        gameStatus,
        isValidating,
        hasAnimatingCards,
      )
    ) {
      console.log('Card can be selected, adding letter')
      setCardAnimationStates(prev => ({
        ...prev,
        [index]: ANIMATION_STATE.ENTERING_WORD,
      }))
      setHandAnimating(true)
      addLetter(letter, index)
    } else {
      console.log('Card cannot be selected')
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
      <div
        className='relative w-full flex justify-center'
        style={{ height: `${LAYOUT_DIMENSIONS.CONTAINER_HEIGHT}px` }}
      >
        {/* Congratulatory Message */}
        {congratsMessage && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex m gap-0 z-50'>
            {congratsMessage.split('').map((letter, index) => (
              <div
                key={index}
                className={`transition-all duration-${
                  ANIMATION_CONSTANTS.BASE_DURATION
                } ${
                  congratsAnimatingIndices.has(index)
                    ? 'opacity-100 transform scale-75'
                    : 'opacity-0 transform scale-0'
                }`}
              >
                <Card
                  letter={letter}
                  type={getLetterType(letter)}
                  onClick={() => {}} // Empty handler for congratulatory cards
                />
              </div>
            ))}
          </div>
        )}
        <div
          className='relative h-full'
          style={{ width: `${LAYOUT_DIMENSIONS.HAND_CONTAINER_WIDTH}px` }}
        >
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
                className={`absolute left-[50%] top-0 transition-all duration-${
                  ANIMATION_CONSTANTS.BASE_DURATION
                } ${
                  cardAnimationStates[index] ===
                    ANIMATION_STATE.ENTERING_WORD ||
                  cardAnimationStates[index] === ANIMATION_STATE.EXITING_WORD ||
                  handAnimating ||
                  draggedCard !== null ||
                  forceHandAnimating
                    ? `transition-transform duration-${ANIMATION_CONSTANTS.BASE_DURATION}`
                    : '!duration-0'
                } ${!isInWord ? 'cursor-move' : ''} ${
                  draggedCard === index ? 'z-50' : 'z-0'
                }`}
                style={{
                  ...(!isInWord
                    ? getHandCardPosition(handIndex, nonSelectedCards.length)
                    : getWordCardPosition(wordIndex, selectedCards.length)),
                  opacity:
                    draggedCard === index
                      ? CARD_ANIMATION.DRAGGED_CARD_OPACITY
                      : 1,
                }}
                draggable={!isInWord && !isValidating}
                onDragStart={e => {
                  if (!isInWord && !isValidating) {
                    const nonSelectedCards = playerHand
                      .map((_, i) => i)
                      .filter(i => !selectedCards.includes(i))
                    const currentIndex = nonSelectedCards.indexOf(index)
                    setDraggedCard(index)
                    setDragStartX(e.clientX)
                    setDragStartIndex(currentIndex)
                    setDropPreviewIndex(currentIndex)
                    e.dataTransfer.effectAllowed = 'move'
                  }
                }}
                onDrag={e => {
                  if (e.clientX === 0) return // Ignore invalid drag events

                  if (
                    draggedCard !== null &&
                    !isInWord &&
                    dragStartIndex !== null
                  ) {
                    const nonSelectedCards = playerHand
                      .map((_, i) => i)
                      .filter(i => !selectedCards.includes(i))
                    const { xSpacing } = getResponsiveValues()

                    const deltaX = e.clientX - dragStartX
                    const indexChange = Math.round(deltaX / xSpacing)
                    const newIndex = Math.max(
                      0,
                      Math.min(
                        dragStartIndex + indexChange,
                        nonSelectedCards.length - 1,
                      ),
                    )

                    if (newIndex !== dropPreviewIndex) {
                      setDropPreviewIndex(newIndex)
                    }
                  }
                }}
                onDragEnd={() => {
                  if (draggedCard !== null && dropPreviewIndex !== null) {
                    const nonSelectedCards = playerHand
                      .map((_, i) => i)
                      .filter(i => !selectedCards.includes(i))
                    reorderHand(draggedCard, nonSelectedCards[dropPreviewIndex])
                  }
                  setDraggedCard(null)
                  setDragStartIndex(null)
                  setDropPreviewIndex(null)
                }}
                onClick={e => {
                  // Only handle click events that aren't from touch events
                  if (e.detail === 0 || e.pointerType === 'touch') {
                    return
                  }
                  console.log('onClick:', {
                    letter: card.letter,
                    index,
                    source: 'mouse',
                    timestamp: Date.now(),
                  })
                  isInWord
                    ? handleWordCardClick(wordIndex)
                    : handleCardClick(card.letter, index)
                }}
                onTouchStart={e => {
                  console.log('onTouchStart:', {
                    letter: card.letter,
                    index,
                    timestamp: Date.now(),
                  })
                  const touch = e.touches[0]
                  setTouchStartTime(Date.now())
                  setDragStartX(touch.clientX)
                  setDragStartY(touch.clientY)
                  setTouchMoved(false)
                  setIsTouch(true)
                  // Only set up drag-related state if this is a draggable card
                  if (!isInWord && !isValidating) {
                    const nonSelectedCards = playerHand
                      .map((_, i) => i)
                      .filter(i => !selectedCards.includes(i))
                    const currentIndex = nonSelectedCards.indexOf(index)
                    setDragStartIndex(currentIndex)
                  }
                }}
                onTouchMove={e => {
                  // Only handle drag movement for draggable cards
                  if (!isInWord && !isValidating && dragStartIndex !== null) {
                    const touch = e.touches[0]
                    const deltaX = touch.clientX - dragStartX
                    const deltaY = touch.clientY - dragStartY
                    const distance = Math.sqrt(
                      deltaX * deltaX + deltaY * deltaY,
                    )

                    if (distance > TOUCH_MOVE_THRESHOLD) {
                      e.preventDefault()
                      setTouchMoved(true)
                      if (!draggedCard) {
                        setDraggedCard(index)
                        setDropPreviewIndex(dragStartIndex)
                      }

                      if (Math.abs(deltaX) > Math.abs(deltaY)) {
                        const nonSelectedCards = playerHand
                          .map((_, i) => i)
                          .filter(i => !selectedCards.includes(i))
                        const { xSpacing } = getResponsiveValues()
                        const indexChange = Math.round(deltaX / xSpacing)
                        const newIndex = Math.max(
                          0,
                          Math.min(
                            dragStartIndex + indexChange,
                            nonSelectedCards.length - 1,
                          ),
                        )

                        if (newIndex !== dropPreviewIndex) {
                          setDropPreviewIndex(newIndex)
                        }
                      }
                    }
                  }
                }}
                onTouchEnd={e => {
                  console.log('onTouchEnd:', {
                    letter: card.letter,
                    index,
                    touchMoved,
                    timestamp: Date.now(),
                  })
                  const touchDuration = Date.now() - touchStartTime

                  if (!touchMoved && touchDuration < TOUCH_TIME_THRESHOLD) {
                    // Handle as a tap/click if no significant movement and short duration
                    isInWord
                      ? handleWordCardClick(wordIndex)
                      : handleCardClick(card.letter, index)
                  } else if (
                    !isInWord &&
                    draggedCard !== null &&
                    dropPreviewIndex !== null
                  ) {
                    // Handle as drag completion
                    const nonSelectedCards = playerHand
                      .map((_, i) => i)
                      .filter(i => !selectedCards.includes(i))
                    reorderHand(draggedCard, nonSelectedCards[dropPreviewIndex])
                  }

                  // Reset all touch-related state
                  setTouchMoved(false)
                  setDraggedCard(null)
                  setDragStartIndex(null)
                  setDropPreviewIndex(null)

                  // Reset touch state immediately
                  setIsTouch(false)
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
                  isExiting={exitingCards.has(index)}
                  className={isValidating ? HAND_STYLES.DISABLED : ''}
                  onClick={() => {
                    if (isInWord) {
                      handleWordCardClick(wordIndex)
                    } else {
                      handleCardClick(card.letter, index)
                    }
                  }}
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
