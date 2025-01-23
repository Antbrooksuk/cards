import React from 'react';
import { WORD_TYPE_COLORS, WORD_TYPE_MULTIPLIER } from '../../constants/gameConfig';
import { calculateWordScore, calculateLetterScore } from '../../utils/cardUtils';

const PlayedWord = ({ word, type, className = '' }) => {
  const typeColor = WORD_TYPE_COLORS[type?.toLowerCase() || 'unknown'];
  
  return (
    <div
      className={`${typeColor} rounded px-3 py-1 text-sm flex items-center justify-between ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>{word}</span>
        {type && (
          <span className="px-2 py-0.5 bg-white/50 rounded-full text-xs">
            {type}
          </span>
        )}
      </div>
      <span className="font-bold flex items-center gap-1">
        {word.split('').reduce((score, letter) => score + calculateLetterScore(letter), 0)}
        <span className="text-xs opacity-75">×</span>
        {WORD_TYPE_MULTIPLIER[type?.toLowerCase() || 'unknown']}
        <span className="text-xs opacity-75">×</span>
        {word.length}
        <span className="text-xs opacity-75">=</span>
        {calculateWordScore(word, type)}
      </span>
    </div>
  );
};

export default PlayedWord;
