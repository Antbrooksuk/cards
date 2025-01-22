import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from './Card';

const Hand = () => {
  const { playerHand, selectedCards, addLetter } = useGame();

  return (
    <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-100 rounded-lg shadow-inner">
      {playerHand.map((card, index) => (
        <Card
          key={card.id}
          id={card.id}
          letter={card.letter}
          type={card.type}
          isSelected={selectedCards.includes(index)}
          onClick={() => {
            if (!selectedCards.includes(index)) {
              addLetter(card.letter, index);
            }
          }}
        />
      ))}
    </div>
  );
};

export default Hand;
