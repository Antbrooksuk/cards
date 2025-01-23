import React from 'react'
import { useGame } from '../../context/GameContext'
import { CARD_TYPE } from '../../constants/cardConstants'

const DeckDisplay = () => {
  const { deck, playerHand, selectedCards } = useGame()

  // Combine deck and hand to show all cards
  const allCards = [...playerHand, ...deck]

  return (
    <div className='p-4 border rounded-lg bg-gray-100'>
      <h3 className='text-lg font-semibold mb-2'>Deck Status</h3>
      <div className='flex flex-wrap gap-2'>
        {allCards.map((card, index) => {
          const isDealt = index < playerHand.length
          const isSelected = isDealt && selectedCards.includes(index)

          const getCardStyle = () => {
            if (isSelected) return 'bg-gray-400 text-white border-gray-400'
            if (isDealt) return 'bg-gray-300 text-gray-500 border-gray-300'

            switch (card.type) {
              case CARD_TYPE.LEGENDARY:
                return 'bg-orange-500 text-white border-orange-500'
              case CARD_TYPE.EPIC:
                return 'bg-purple-500 text-white border-purple-500'
              case CARD_TYPE.UNCOMMON:
                return 'bg-green-500 text-white border-green-500'
              case CARD_TYPE.RARE:
                return 'bg-blue-500 text-white border-blue-500'
              case CARD_TYPE.VOWEL:
                return 'bg-white text-gray-800 border-gray-300'
              default:
                return 'bg-gray-500 text-white border-gray-500'
            }
          }

          return (
            <span
              key={`${card}-${index}`}
              className={`inline-block w-8 h-8 flex items-center justify-center rounded border
                ${getCardStyle()}`}
            >
              <div className='relative w-full h-full flex flex-col items-center justify-center'>
                <span className='text-[8px] absolute top-0 left-1 opacity-50'>
                  {card.id}
                </span>
                <span>{card.letter}</span>
              </div>
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default DeckDisplay
