import React from 'react';
import ScoreDisplay from '../common/ScoreDisplay';
import { calculateWordScore } from '../../utils/cardUtils';

const GameBoard = ({ 
  words = [], 
  invalidWords = [],
  score, 
  roundNumber,
  className = '' 
}) => {
  return (
    <div className={`game-container ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-bold">Round {roundNumber}</div>
        <ScoreDisplay score={score} />
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Valid Words ({words.length})</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {words.map((wordObj, index) => (
            <div
              key={index}
              className="bg-green-50 rounded px-3 py-1 text-sm text-green-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{wordObj.word}</span>
                {wordObj.type && (
                  <span className="px-2 py-0.5 bg-green-100 rounded-full text-xs">
                    {wordObj.type}
                  </span>
                )}
              </div>
              <span className="font-bold text-green-700">
                {calculateWordScore(wordObj.word, wordObj.type)}
              </span>
            </div>
          ))}
          </div>
        </div>

        {invalidWords.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">Invalid Words ({invalidWords.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {invalidWords.map((wordObj, index) => (
                <div
                  key={index}
                  className="bg-red-50 rounded px-3 py-1 text-sm text-red-800"
                >
                  {typeof wordObj === 'string' ? wordObj : wordObj.word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
