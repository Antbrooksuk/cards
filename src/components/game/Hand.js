import React from 'react';
import { useGame } from '../../context/GameContext';
import Card from './Card';

const Hand = () => {
  const { playerHand, selectedCards, addLetter, canReshuffle, reshuffleHand } = useGame();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex flex-wrap gap-4 justify-center p-4 bg-gray-100 rounded-lg shadow-inner">
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
      <button
        onClick={reshuffleHand}
        disabled={!canReshuffle}
        className={`mt-4 px-4 py-2 rounded-lg shadow transition-colors ${
          canReshuffle 
            ? 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Reshuffle Hand (No Vowels)
      </button>
    </div>
  );
};

export default Hand;
