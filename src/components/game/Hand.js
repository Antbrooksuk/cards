import React, { useState, useEffect } from 'react'
import { useGame } from '../../context/GameContext'
import Card from './Card'
import useCardAnimation from '../../hooks/useCardAnimation'
import { canSelectCard, HAND_STYLES } from '../../utils/handUtils'
import { GAME_STATUS } from '../../constants/gameConfig'
import { ANIMATION_TIMING } from '../../constants/cardConstants'

const Hand = ({ isValidating }) => {
  const { playerHand, selectedCards, addLetter, gameStatus, clearNewFlags } =
    useGame()
  const [exitingCards, setExitingCards] = useState(new Set())

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)
  const hasAnimatingCards = animatingCards.size > 0

  useEffect(() => {
    if (gameStatus === GAME_STATUS.ROUND_COMPLETE) {
      // Start exit animations in reverse order
      playerHand.forEach((_, index) => {
        setTimeout(() => {
          setExitingCards(
            prev => new Set([...prev, playerHand.length - 1 - index]),
          )
        }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
      })
    } else {
      setExitingCards(new Set())
    }
  }, [gameStatus, playerHand.length])
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
          isExiting={exitingCards.has(index)}
          onClick={() => handleCardClick(card.letter, index)}
          className={isValidating ? HAND_STYLES.DISABLED : ''}
        />
      ))}
    </div>
  )
}

export default Hand
