import React from 'react';
import Button from '../common/Button';

const Welcome = ({ onStartGame }) => {
  return (
    <div className="game-container min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center mb-6">Word Game</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Type as many valid words as you can</li>
          <li>Each round lasts 60 seconds</li>
          <li>Longer words score more points</li>
          <li>No repeated words allowed</li>
        </ul>
        
        <Button
          onClick={onStartGame}
          className="w-full text-lg py-3"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
