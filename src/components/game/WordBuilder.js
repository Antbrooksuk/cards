import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from './Card';

const WordBuilder = () => {
  const { currentWord, playerHand, selectedCards, removeLetter } = useGame();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap gap-4 justify-center p-4 bg-blue-100 rounded-lg shadow-inner min-h-[100px]">
        {selectedCards.map((cardIndex, index) => {
          const card = playerHand[cardIndex];
          return (
            <div 
              key={card.id} 
              onClick={() => {
                // Remove this letter and all letters after it
                for (let i = 0; i < selectedCards.length - index; i++) {
                  removeLetter();
                }
              }}
              className="cursor-pointer"
            >
              <Card
                id={card.id}
                letter={card.letter}
                type={card.type}
                isSelected={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordBuilder;
