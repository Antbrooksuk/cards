import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import GameBoard from '../game/GameBoard';
import Hand from '../game/Hand';
import DeckDisplay from '../game/DeckDisplay';
import WordBuilder from '../game/WordBuilder';

const Round = ({ className = '' }) => {
  const {
    words,
    invalidWords,
    score,
    currentRound: roundNumber,
    currentWord,
    playerHand,
    selectedCards,
    addWord,
    addLetter,
    removeLetter,
    clearWord,
    endRound,
    discardCards
  } = useGame();

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.key === 'Enter' && currentWord) {
        const validation = await addWord(currentWord);
        if (!validation.isValid) {
          // Word was invalid, don't clear the word so player can try again
          console.log('Invalid word:', validation.reason);
        }
      } else if (e.key === 'Backspace') {
        removeLetter();
      } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
        const letter = e.key.toLowerCase();
        // Find first available card with matching letter
        const cardIndex = playerHand.findIndex((card, index) => 
          !selectedCards.includes(index) && card.letter.toLowerCase() === letter
        );
        if (cardIndex !== -1) {
          addLetter(letter, cardIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addWord, addLetter, removeLetter, clearWord, currentWord, playerHand, selectedCards]);

  return (
    <div className={`min-h-screen py-8 ${className}`}>
      <GameBoard
        words={words}
        invalidWords={invalidWords}
        score={score}
        roundNumber={roundNumber}
      />
      
      <div className="game-container mt-6 space-y-6">
        <WordBuilder />
        <Hand />
        <div className="flex justify-center gap-4 mb-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
            disabled={selectedCards.length === 0}
            onClick={async () => {
              const validation = await addWord(currentWord);
              if (!validation.isValid) {
                console.log('Invalid word:', validation.reason);
              }
            }}
          >
            Play Word
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
            disabled={selectedCards.length === 0}
            onClick={discardCards}
          >
            Discard
          </button>
        </div>
        <DeckDisplay />
      </div>
    </div>
  );
};

export default Round;
