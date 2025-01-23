export const canSelectCard = (
  index,
  selectedCards,
  gameStatus,
  isValidating,
) => {
  return (
    !selectedCards.includes(index) && gameStatus === 'playing' && !isValidating
  )
}

export const HAND_STYLES = {
  CONTAINER:
    'w-full border flex flex-wrap gap-4 justify-center p-4 bg-gray-100 rounded-lg',
  DISABLED: 'cursor-not-allowed opacity-50',
}
