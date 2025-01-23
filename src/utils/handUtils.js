import { GAME_STATUS } from '../constants/gameConstants'
import { HAND_STYLES } from '../constants/styleConstants'

export const canSelectCard = (
  index,
  selectedCards,
  gameStatus,
  isValidating,
) => {
  return (
    !selectedCards.includes(index) &&
    gameStatus === GAME_STATUS.PLAYING &&
    !isValidating
  )
}

export { HAND_STYLES }
