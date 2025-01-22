import React from 'react';

const ScoreDisplay = ({ score, targetScore, label = 'Score', className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-lg font-semibold text-gray-600">{label}</div>
      <div className="text-3xl font-bold text-blue-600">{score}</div>
      {targetScore && (
        <div className="mt-1">
          <div className="text-sm text-gray-500">Target</div>
          <div className="text-xl font-semibold text-green-600">{targetScore}</div>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
