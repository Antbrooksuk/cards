import React from 'react';
import { useGame } from '../../context/GameContext';

const DeckDisplay = () => {
  const { deck, playerHand, selectedCards } = useGame();
  
  // Combine deck and hand to show all cards
  const allCards = [...playerHand, ...deck];
  
  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-semibold mb-2">Deck Status</h3>
      <div className="flex flex-wrap gap-2">
        {allCards.map((card, index) => {
          const isDealt = index < playerHand.length;
          const isSelected = isDealt && selectedCards.includes(index);
          
          return (
            <span
              key={`${card}-${index}`}
              className={`inline-block w-8 h-8 flex items-center justify-center rounded border
                ${isSelected ? 'text-red-500 border-red-500' : 
                  isDealt ? 'text-red-500' : 'text-gray-700'}`}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <span className="text-[8px] absolute top-0 left-1 opacity-50">{card.id}</span>
                <span>{card.letter}</span>
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default DeckDisplay;
