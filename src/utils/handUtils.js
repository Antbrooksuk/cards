import { GAME_STATUS } from '../constants/gameConstants'
import { HAND_STYLES } from '../constants/styleConstants'

export const canSelectCard = (
  index,
  selectedCards,
  gameStatus,
  isValidating,
  hasAnimatingCards,
  isAnimating,
) => {
  const invalidGameStates = [
    GAME_STATUS.ROUND_COMPLETE,
    GAME_STATUS.ROUND_END,
    GAME_STATUS.GAME_OVER,
    GAME_STATUS.VALIDATING,
  ]

  return (
    !selectedCards.includes(index) &&
    !invalidGameStates.includes(gameStatus) &&
    !isValidating &&
    !hasAnimatingCards &&
    !isAnimating
  )
}

export { HAND_STYLES }
