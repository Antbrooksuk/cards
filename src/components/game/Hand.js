import React from 'react'
import { useGame } from '../../context/GameContext'
import Card from './Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { canSelectCard, HAND_STYLES } from '../../utils/handUtils'

const Hand = ({ isValidating }) => {
  const { playerHand, selectedCards, addLetter, gameStatus, clearNewFlags } =
    useGame()

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)

  const hasAnimatingCards = animatingCards.size > 0
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
      addLetter(letter, index)
    }
  }

  return (
    <div className={HAND_STYLES.CONTAINER}>
      {playerHand.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          letter={card.letter}
          type={card.type}
          isSelected={selectedCards.includes(index)}
          isAnimating={animatingCards.has(index)}
          isNew={card.isNew}
          onClick={() => handleCardClick(card.letter, index)}
          className={isValidating ? HAND_STYLES.DISABLED : ''}
        />
      ))}
    </div>
  )
}

export default Hand
