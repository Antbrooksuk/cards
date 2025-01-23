import React from 'react'
import ScoreDisplay from '../common/ScoreDisplay'
import DebugPanel from './DebugPanel'
import WordList from './WordList'

const GAME_BOARD_STYLES = {
  CONTAINER: 'game-container',
  HEADER: 'flex justify-between items-center mb-6',
  ROUND_NUMBER: 'text-xl font-bold',
  SCORES_CONTAINER: 'flex gap-8',
  CONTENT: 'space-y-4',
}

const GameBoard = ({
  words = [],
  invalidWords = [],
  score,
  roundScore,
  roundNumber,
  targetScore,
  onWordSubmit,
}) => {
  return (
    <div className={GAME_BOARD_STYLES.CONTAINER}>
      <DebugPanel onWordSubmit={onWordSubmit} />
      <div className={GAME_BOARD_STYLES.HEADER}>
        <div className={GAME_BOARD_STYLES.ROUND_NUMBER}>
          Round {roundNumber}
        </div>
        <div className={GAME_BOARD_STYLES.SCORES_CONTAINER}>
          <ScoreDisplay
            score={roundScore}
            label='Round Score'
            targetScore={targetScore}
          />
          <ScoreDisplay score={score} label='Total Score' />
        </div>
      </div>

      <div className={GAME_BOARD_STYLES.CONTENT}>
        <WordList words={words} invalidWords={invalidWords} />
      </div>
    </div>
  )
}

export default GameBoard
