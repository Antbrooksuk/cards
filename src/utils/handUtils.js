import { GAME_STATUS } from '../constants/gameConstants'
import { HAND_STYLES } from '../constants/styleConstants'

export const canSelectCard = (
  index,
  selectedCards,
  gameStatus,
  isValidating,
  hasAnimatingCards,
) => {
  return (
    !selectedCards.includes(index) &&
    gameStatus === GAME_STATUS.PLAYING &&
    !isValidating &&
    !hasAnimatingCards
  )
}

export { HAND_STYLES }
