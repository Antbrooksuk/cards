import React, { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { calculateLetterScore } from '../../utils/scoreUtils'
import { getLetterType } from '../../utils/cardUtils'
import Card from '../common/Card'
import ScoreAnimation from './ScoreAnimation'
import { CONGRATULATORY_MESSAGES } from '../../constants/messageConstants'
import { ANIMATION_TIMING } from '../../constants/cardConstants'
import { CARD_CLASSES } from '../../constants/tailwindClasses'

const Spinner = () => (
  <div className='flex justify-center items-center h-[100px]'>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
  </div>
)

const WordBuilder = ({
  onAnimationComplete,
  isAnimating,
  isValidating,
  animatingIndices,
}) => {
  const { playerHand, selectedCards, removeLetter, roundScore, targetScore } =
    useGame()

  const [congratsMessage, setCongratsMessage] = useState('')
  const [congratsAnimatingIndices, setCongratsAnimatingIndices] = useState(
    new Set(),
  )

  useEffect(() => {
    if (roundScore >= targetScore) {
      const randomIndex = Math.floor(
        Math.random() * CONGRATULATORY_MESSAGES.length,
      )
      const message = CONGRATULATORY_MESSAGES[randomIndex]
      setCongratsMessage(message)

      // Clear any existing animations
      setCongratsAnimatingIndices(new Set())

      // Stagger the animations for each letter
      message.split('').forEach((_, index) => {
        setTimeout(() => {
          setCongratsAnimatingIndices(prev => new Set([...prev, index]))
        }, index * ANIMATION_TIMING.CARD_STAGGER_DELAY)
      })
    } else {
      setCongratsMessage('')
      setCongratsAnimatingIndices(new Set())
    }
  }, [roundScore, targetScore])

  return (
    <div id='wordBuilder' className='flex flex-col items-center gap-4'>
      <div className='flex border bg-gray-100 flex-wrap gap-4 justify-center items-center rounded-lg min-h-[100px] w-full'>
        {isValidating ? (
          <Spinner />
        ) : congratsMessage ? (
          <div className='flex gap-4 justify-center py-6'>
            {congratsMessage.split('').map((char, index) => (
              <div
                key={index}
                className={`${
                  !congratsAnimatingIndices.has(index)
                    ? CARD_CLASSES.animation.new
                    : ''
                } transform transition-all duration-300`}
              >
                <Card
                  id={`congrats-${index}`}
                  letter={char.toUpperCase()}
                  type={getLetterType(char)}
                />
              </div>
            ))}
          </div>
        ) : (
          selectedCards.map((cardIndex, index) => {
            const card = playerHand[cardIndex]
            return (
              <div
                key={card.id}
                onClick={() => {
                  if (!isAnimating) {
                    // Remove this letter and all letters after it
                    for (let i = 0; i < selectedCards.length - index; i++) {
                      removeLetter()
                    }
                  }
                }}
                className='cursor-pointer relative'
              >
                {animatingIndices.includes(index) && (
                  <ScoreAnimation
                    score={calculateLetterScore(card.letter)}
                    onComplete={() => {
                      if (index === selectedCards.length - 1) {
                        onAnimationComplete()
                      }
                    }}
                  />
                )}
                <Card id={card.id} letter={card.letter} type={card.type} />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default WordBuilder
