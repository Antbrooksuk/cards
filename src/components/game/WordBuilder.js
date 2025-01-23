import React from 'react'
import { useGame } from '../../context/GameContext'
import { calculateLetterScore } from '../../utils/cardUtils'
import Card from './Card'
import ScoreAnimation from './ScoreAnimation'

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
  const { currentWord, playerHand, selectedCards, removeLetter } = useGame()

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='flex border bg-gray-100 flex-wrap gap-4 justify-center items-center rounded-lg min-h-[100px] w-full'>
        {isValidating ? (
          <Spinner />
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
