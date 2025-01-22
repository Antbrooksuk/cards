import React from 'react';
import { WORD_TYPE_COLORS } from '../../constants/gameConfig';
import { calculateWordScore } from '../../utils/cardUtils';

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
      <span className="font-bold">
        {calculateWordScore(word, type)}
      </span>
    </div>
  );
};

export default PlayedWord;
