import React from 'react';
import { calculateLetterScore } from '../../utils/cardUtils';
import { CARD_TYPE } from '../../constants/gameConfig';

const Card = ({ id, letter, type, isSelected, isAnimating, isNew, onClick }) => {
  const getCardStyle = () => {
    if (isSelected) return 'bg-gray-400 text-white';
    switch (type) {
      case CARD_TYPE.LEGENDARY:
        return 'bg-orange-500 text-white';
      case CARD_TYPE.EPIC:
        return 'bg-purple-500 text-white';
      case CARD_TYPE.UNCOMMON:
        return 'bg-green-500 text-white';
      case CARD_TYPE.RARE:
        return 'bg-blue-500 text-white';
      case CARD_TYPE.VOWEL:
        return 'bg-white text-gray-800';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <div 
      onClick={onClick}
      className={`
        ${getCardStyle()} font-bold text-2xl
        w-16 h-20 rounded-lg shadow-md
        flex items-center justify-center
        transform transition-all duration-300
        ${isAnimating ? 'animate-dealCard' : isNew ? 'opacity-0' : ''}
      `}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <span className="text-xs absolute top-1 left-1 opacity-50">{id}</span>
        <span className="text-2xl">{letter}</span>
        <span className="text-xs absolute bottom-1 right-1 opacity-75">{calculateLetterScore(letter)}</span>
      </div>
    </div>
  );
};

export default Card;
