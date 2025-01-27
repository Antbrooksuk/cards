import React from 'react'
import ScoreDisplay from './ScoreDisplay'
import { ANIMATION_CONSTANTS } from '../../constants/cardConstants'
import AnimatedScoreDisplay from './AnimatedScoreDisplay'

const ROUND_SCORE_STYLES = {
  CONTAINER: 'text-center flex-1',
  LABEL: 'text-lg font-semibold text-gray-600',
  SCORE_CONTAINER: 'text-3xl font-bold flex items-center justify-center gap-2',
  CURRENT_SCORE: 'text-blue-600',
  DIVIDER: 'text-gray-400',
  TARGET_SCORE: 'text-green-600',
  PROGRESS_BAR: 'mt-2 h-2 bg-gray-200 rounded-full overflow-hidden',
  PROGRESS_FILL: `h-full bg-blue-600 transition-all duration-1000 ease-in-out`,
}

const Header = ({ roundNumber, roundScore, targetScore, totalScore }) => {
  const progressPercentage = Math.min((roundScore / targetScore) * 100, 100)
  const score = Number(
    typeof roundScore === 'object' ? roundScore.score : roundScore,
  )

  return (
    <div id='header' className='flex pt-4 '>
      <div className={ROUND_SCORE_STYLES.CONTAINER}>
        <AnimatedScoreDisplay
          label={`Round ${roundNumber} Score`}
          score={score}
          targetScore={targetScore}
        />

        {targetScore && (
          <div className={ROUND_SCORE_STYLES.PROGRESS_BAR}>
            <div
              className={ROUND_SCORE_STYLES.PROGRESS_FILL}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
      {/* <ScoreDisplay score={totalScore} label='Total Score' /> */}
    </div>
  )
}

export default Header
