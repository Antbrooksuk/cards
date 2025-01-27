import { ANIMATION_STATE } from '../constants/cardConstants'
import { canSelectCard } from './handUtils'
import { getResponsiveValues } from './animationUtils'

const TOUCH_MOVE_THRESHOLD = 10 // pixels
const TOUCH_TIME_THRESHOLD = 200 // milliseconds

export const handleCardClick = (letter, index, options) => {
  const {
    selectedCards,
    gameStatus,
    isValidating,
    hasAnimatingCards,
    setCardAnimationStates,
    setHandAnimating,
    addLetter,
  } = options

  //   console.log('handleCardClick:', { letter, index })
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

export const handleWordCardClick = (index, options) => {
  const { isValidating, selectedCards, setCardAnimationStates, removeLetter } =
    options

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

export const handleTouchStart = (e, card, index, options) => {
  const {
    isInWord,
    isValidating,
    playerHand,
    selectedCards,
    setTouchStartTime,
    setDragStartX,
    setDragStartY,
    setTouchMoved,
    setDragStartIndex,
  } = options

  // console.log('onTouchStart:', {
  //   letter: card.letter,
  //   index,
  //   timestamp: Date.now(),
  // })
  const touch = e.touches[0]
  setTouchStartTime(Date.now())
  setDragStartX(touch.clientX)
  setDragStartY(touch.clientY)
  setTouchMoved(false)

  // Only set up drag-related state if this is a draggable card
  if (!isInWord && !isValidating) {
    const nonSelectedCards = playerHand
      .map((_, i) => i)
      .filter(i => !selectedCards.includes(i))
    const currentIndex = nonSelectedCards.indexOf(index)
    setDragStartIndex(currentIndex)
  }
}

export const handleTouchMove = (e, options) => {
  const {
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
  } = options

  // Only handle drag movement for draggable cards
  if (!isInWord && !isValidating && dragStartIndex !== null) {
    const touch = e.touches[0]
    const deltaX = touch.clientX - dragStartX
    const deltaY = touch.clientY - dragStartY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

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
          Math.min(dragStartIndex + indexChange, nonSelectedCards.length - 1),
        )

        if (newIndex !== dropPreviewIndex) {
          setDropPreviewIndex(newIndex)
        }
      }
    }
  }
}

export const handleTouchEnd = (e, card, index, options) => {
  const {
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
  } = options

  // console.log('onTouchEnd:', {
  //   letter: card.letter,
  //   index,
  //   touchMoved,
  //   timestamp: Date.now(),
  // })
  const touchDuration = Date.now() - touchStartTime

  if (!touchMoved && touchDuration < TOUCH_TIME_THRESHOLD) {
    // Handle as a tap/click if no significant movement and short duration
    isInWord
      ? handleWordCardClick(selectedCards.indexOf(index), options)
      : handleCardClick(card.letter, index, options)
  } else if (!isInWord && draggedCard !== null && dropPreviewIndex !== null) {
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
}

export const handleDragStart = (e, index, options) => {
  const {
    isInWord,
    isValidating,
    playerHand,
    selectedCards,
    setDraggedCard,
    setDragStartX,
    setDragStartIndex,
    setDropPreviewIndex,
  } = options

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
}

export const handleDrag = (e, options) => {
  const {
    draggedCard,
    isInWord,
    dragStartIndex,
    dragStartX,
    playerHand,
    selectedCards,
    dropPreviewIndex,
    setDropPreviewIndex,
  } = options

  if (e.clientX === 0) return // Ignore invalid drag events

  if (draggedCard !== null && !isInWord && dragStartIndex !== null) {
    const nonSelectedCards = playerHand
      .map((_, i) => i)
      .filter(i => !selectedCards.includes(i))
    const { xSpacing } = getResponsiveValues()

    const deltaX = e.clientX - dragStartX
    const indexChange = Math.round(deltaX / xSpacing)
    const newIndex = Math.max(
      0,
      Math.min(dragStartIndex + indexChange, nonSelectedCards.length - 1),
    )

    if (newIndex !== dropPreviewIndex) {
      setDropPreviewIndex(newIndex)
    }
  }
}

export const handleDragEnd = options => {
  const {
    draggedCard,
    dropPreviewIndex,
    playerHand,
    selectedCards,
    reorderHand,
    setDraggedCard,
    setDragStartIndex,
    setDropPreviewIndex,
  } = options

  if (draggedCard !== null && dropPreviewIndex !== null) {
    const nonSelectedCards = playerHand
      .map((_, i) => i)
      .filter(i => !selectedCards.includes(i))
    reorderHand(draggedCard, nonSelectedCards[dropPreviewIndex])
  }
  setDraggedCard(null)
  setDragStartIndex(null)
  setDropPreviewIndex(null)
}
