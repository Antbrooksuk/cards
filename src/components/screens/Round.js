import React, { useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { MAX_DISCARDS_PER_ROUND, MAX_LETTERS_PER_DISCARD } from '../../constants/gameConfig';
import GameBoard from '../game/GameBoard';
import Hand from '../game/Hand';
import DeckDisplay from '../game/DeckDisplay';
import WordBuilder from '../game/WordBuilder';

const Round = ({ className = '' }) => {
  const {
    words,
    invalidWords,
    score,
    roundScore,
    currentRound: roundNumber,
    currentWord,
    targetScore,
    playerHand,
    selectedCards,
    addWord,
    addLetter,
    removeLetter,
    clearWord,
    endRound,
    discardCards,
    canReshuffle,
    reshuffleHand,
    gameStatus,
    showRoundEnd,
    discardsUsed
  } = useGame();

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (gameStatus !== 'playing') return;
      
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
        roundScore={roundScore}
        roundNumber={roundNumber}
        targetScore={targetScore}
      />
      
      <div className="game-container space-y-6">
        <WordBuilder />
        <Hand />
        <div className="flex justify-center gap-4 mb-6">
          {gameStatus === 'playing' ? (
            <>
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
                disabled={selectedCards.length === 0 || 
                         selectedCards.length > MAX_LETTERS_PER_DISCARD || 
                         discardsUsed >= MAX_DISCARDS_PER_ROUND}
                onClick={discardCards}
                title={`${MAX_LETTERS_PER_DISCARD} letters max, ${MAX_DISCARDS_PER_ROUND - discardsUsed} discards remaining`}
              >
                Discard ({MAX_DISCARDS_PER_ROUND - discardsUsed})
              </button>
              <button
                onClick={reshuffleHand}
                disabled={!canReshuffle}
                className={`px-4 py-2 rounded-lg ${
                  canReshuffle 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reshuffle Hand
              </button>
            </>
          ) : gameStatus === 'roundComplete' && (
            <button
              onClick={showRoundEnd}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Continue
            </button>
          )}
        </div>
        <DeckDisplay />
      </div>
    </div>
  );
};

export default Round;
