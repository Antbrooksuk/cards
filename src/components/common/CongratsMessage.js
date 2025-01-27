import React from 'react'
import Card from './Card'
import { getLetterType } from '../../utils/cardUtils'

const CongratsMessage = ({ message, animatingIndices, positions }) => {
  if (!message) return null

  return (
    <div className='relative mx-auto h-full'>
      {message.split('').map((letter, index) => (
        <div
          key={index}
          className={`absolute left-[50%]`}
          style={{
            ...positions[index],
            top: index % 2 === 0 ? '-4px' : '4px',
          }}
        >
          <Card
            letter={letter}
            type={getLetterType(letter)}
            isAnimating={animatingIndices.has(index)}
            onClick={() => {}} // Empty handler for congratulatory cards
            className={`${
              animatingIndices.has(index)
                ? 'animate-congratsCard'
                : 'opacity-0 scale-0'
            }`}
          />
        </div>
      ))}
    </div>
  )
}

export default CongratsMessage
