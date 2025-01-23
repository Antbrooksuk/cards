import React, { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import Card from './Card'

const Hand = ({ isValidating }) => {
  const { playerHand, selectedCards, addLetter, gameStatus, clearNewFlags } =
    useGame()
  const [animatingCards, setAnimatingCards] = useState(new Set())

  useEffect(() => {
    // Find new cards and animate them with a stagger
    const newCards = playerHand.reduce((acc, card, index) => {
      if (card.isNew) acc.push(index)
      return acc
    }, [])

    if (newCards.length > 0) {
      // Clear any existing animations
      setAnimatingCards(new Set())

      // Stagger the animations
      newCards.forEach((cardIndex, i) => {
        setTimeout(() => {
          setAnimatingCards(prev => new Set([...prev, cardIndex]))
        }, i * 100) // 100ms stagger between each card
      })

      // Remove animation classes and isNew flags after they complete
      setTimeout(
        () => {
          setAnimatingCards(new Set())
          clearNewFlags()
        },
        newCards.length * 100 + 500,
      ) // Total stagger time + animation duration
    }
  }, [playerHand])

  return (
    <div className='w-full flex flex-wrap gap-4 justify-center p-4 bg-gray-100 rounded-lg shadow-inner'>
      {playerHand.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          letter={card.letter}
          type={card.type}
          isSelected={selectedCards.includes(index)}
          isAnimating={animatingCards.has(index)}
          isNew={card.isNew}
          onClick={() => {
            if (
              !selectedCards.includes(index) &&
              gameStatus === 'playing' &&
              !isValidating
            ) {
              addLetter(card.letter, index)
            }
          }}
          className={isValidating ? 'cursor-not-allowed opacity-50' : ''}
        />
      ))}
    </div>
  )
}

export default Hand
