import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { createDeck, shuffleArray, dealCards, calculateWordScore } from '../utils/cardUtils';
import useWordValidation from '../hooks/useWordValidation';

const GameContext = createContext();

const initialState = {
  gameStatus: 'welcome', // welcome, playing, roundEnd, gameOver
  currentRound: 1,
  score: 0,
  roundScore: 0,
  words: [], // Valid words for current round [{word: string, type: string}]
  invalidWords: [], // Invalid words for current round
  allWords: [], // All words used across rounds (both valid and invalid)
  deck: [], // Current deck of cards
  playerHand: [], // Player's current hand of cards
  currentWord: '', // Current word being built
  selectedCards: [], // Indices of selected cards in playerHand
};

// Helper function to handle dealing new cards
const handleCardDealing = (state, selectedIndices) => {
  // Get the cards to remove based on selected indices
  const usedCards = selectedIndices.map(index => state.playerHand[index]);
  
  // Create new hand without the used cards
  const remainingHand = state.playerHand.filter((_, index) => !selectedIndices.includes(index));
  
  // Add used cards to bottom of deck
  const updatedDeck = [...state.deck, ...usedCards];
  
  // Deal new cards to replace used ones
  const dealResult = dealCards(updatedDeck, selectedIndices.length);
  
  // Create new hand with new cards added to the end
  const newHand = [...remainingHand, ...dealResult.dealtCards];

  return {
    deck: dealResult.remainingDeck,
    playerHand: newHand
  };
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_GAME':
      const startDeck = shuffleArray(createDeck());
      const { dealtCards, remainingDeck } = dealCards(startDeck, 10);
      return {
        ...initialState,
        gameStatus: 'playing',
        deck: remainingDeck,
        playerHand: dealtCards,
      };

    case 'ADD_WORD':
      const { word, isValid, validation } = action.payload;
      const normalizedWord = word.toLowerCase();
      
      // Check if word has been played before
      if (state.allWords.some(w => typeof w === 'string' ? w === normalizedWord : w.word === normalizedWord)) {
        return state;
      }

      // Deal new cards
      const { deck: updatedDeck, playerHand: newHand } = handleCardDealing(state, state.selectedCards);

      if (isValid) {
        const wordScore = calculateWordScore(normalizedWord, validation.wordType);
        return {
          ...state,
          words: [...state.words, { word: normalizedWord, type: validation.wordType }],
          allWords: [...state.allWords, { word: normalizedWord, type: validation.wordType }],
          score: state.score + wordScore,
          roundScore: state.roundScore + wordScore,
          currentWord: '',
          selectedCards: [],
          deck: updatedDeck,
          playerHand: newHand,
        };
      } else {
        // Add invalid word with no score
        return {
          ...state,
          invalidWords: [...state.invalidWords, normalizedWord],
          allWords: [...state.allWords, { word: normalizedWord }],
          currentWord: '',
          selectedCards: [],
          deck: updatedDeck,
          playerHand: newHand,
        };
      }

    case 'END_ROUND':
      return {
        ...state,
        gameStatus: 'roundEnd',
      };

    case 'START_NEXT_ROUND':
      if (state.currentRound >= 3) {
        return {
          ...state,
          gameStatus: 'gameOver',
        };
      }
      const nextDeck = shuffleArray(createDeck());
      const nextHand = dealCards(nextDeck, 10);
      return {
        ...state,
        gameStatus: 'playing',
        currentRound: state.currentRound + 1,
        words: [],
        invalidWords: [],
        roundScore: 0,
        deck: nextHand.remainingDeck,
        playerHand: nextHand.dealtCards,
      };

    case 'PLAY_AGAIN':
      return initialState;

    case 'ADD_LETTER':
      const { letter, cardIndex } = action.payload;
      // Only add letter if it hasn't been used (not in selectedCards)
      if (!state.selectedCards.includes(cardIndex)) {
        return {
          ...state,
          currentWord: state.currentWord + letter,
          selectedCards: [...state.selectedCards, cardIndex],
        };
      }
      return state;

    case 'REMOVE_LETTER':
      return {
        ...state,
        currentWord: state.currentWord.slice(0, -1),
        selectedCards: state.selectedCards.slice(0, -1),
      };

    case 'CLEAR_WORD':
      return {
        ...state,
        currentWord: '',
        selectedCards: [],
      };

    case 'DISCARD_CARDS':
      const { deck: discardDeck, playerHand: discardHand } = handleCardDealing(state, state.selectedCards);
      
      return {
        ...state,
        deck: discardDeck,
        playerHand: discardHand,
        selectedCards: [],
        currentWord: '',
      };

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { validateWord } = useWordValidation();

  const addWord = useCallback(async (word) => {
    const validation = await validateWord(word);
    dispatch({ 
      type: 'ADD_WORD', 
      payload: { 
        word: word.toLowerCase(),
        isValid: validation.isValid,
        validation // Pass the full validation result for word type
      }
    });
    return validation;
  }, [validateWord]);

  const value = {
    ...state,
    startGame: () => dispatch({ type: 'START_GAME' }),
    addWord,
    addLetter: (letter, cardIndex) => dispatch({ type: 'ADD_LETTER', payload: { letter, cardIndex } }),
    removeLetter: () => dispatch({ type: 'REMOVE_LETTER' }),
    clearWord: () => dispatch({ type: 'CLEAR_WORD' }),
    endRound: () => dispatch({ type: 'END_ROUND' }),
    startNextRound: () => dispatch({ type: 'START_NEXT_ROUND' }),
    playAgain: () => dispatch({ type: 'PLAY_AGAIN' }),
    discardCards: () => dispatch({ type: 'DISCARD_CARDS' }),
    // Expose deck and hand for components
    deck: state.deck,
    playerHand: state.playerHand,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
