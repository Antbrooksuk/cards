import React from 'react';

const ScoreDisplay = ({ score, label = 'Score', className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-lg font-semibold text-gray-600">{label}</div>
      <div className="text-3xl font-bold text-blue-600">{score}</div>
    </div>
  );
};

export default ScoreDisplay;
