import { ANIMATION_STATE } from '../constants/cardConstants'
import { GAME_STATUS } from '../constants/gameConstants'
import { canSelectCard } from './handUtils'

export const handleCardClick = (letter, index, options) => {
  const {
    selectedCards,
    gameStatus,
    isValidating,
    hasAnimatingCards,
    setCardAnimationStates,
    setHandAnimating,
    addLetter,
    isAnimating,
  } = options

  if (
    gameStatus === GAME_STATUS.PLAYING &&
    canSelectCard(
      index,
      selectedCards,
      gameStatus,
      isValidating,
      hasAnimatingCards,
      isAnimating,
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
