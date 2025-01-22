import React from 'react';
import { CardType, calculateLetterScore } from '../../utils/cardUtils';

const Card = ({ id, letter, type, isSelected, onClick }) => {
  const baseColor = type === CardType.VOWEL ? 'bg-blue-500' : 'bg-green-500';
  const bgColor = isSelected ? 'bg-gray-400' : baseColor;
  
  return (
    <div 
      onClick={onClick}
      className={`
        ${bgColor} text-white font-bold text-2xl
        w-16 h-20 rounded-lg shadow-md
        flex items-center justify-center
        transform transition-transform
        ${isSelected ? 'opacity-50' : 'hover:scale-105 cursor-pointer'}
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
