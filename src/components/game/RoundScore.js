import React from 'react'

const ROUND_SCORE_STYLES = {
  CONTAINER: 'text-center',
  LABEL: 'text-lg font-semibold text-gray-600',
  SCORE_CONTAINER: 'text-3xl font-bold flex items-center justify-center gap-2',
  CURRENT_SCORE: 'text-blue-600',
  DIVIDER: 'text-gray-400',
  TARGET_SCORE: 'text-green-600',
  PROGRESS_BAR: 'mt-2 h-2 bg-gray-200 rounded-full overflow-hidden',
  PROGRESS_FILL: 'h-full bg-blue-600 transition-all duration-300 ease-in-out',
}

const RoundScore = ({ score = 0, targetScore, className = '' }) => {
  const progressPercentage = Math.min((score / targetScore) * 100, 100)

  return (
    <div
      id='roundScore'
      className={`${ROUND_SCORE_STYLES.CONTAINER} ${className}`}
    >
      <div className={ROUND_SCORE_STYLES.LABEL}>Round Score</div>
      <div className={ROUND_SCORE_STYLES.SCORE_CONTAINER}>
        <span className={ROUND_SCORE_STYLES.CURRENT_SCORE}>
          {Number(typeof score === 'object' ? score.score : score)}
        </span>
        {targetScore && (
          <>
            <span className={ROUND_SCORE_STYLES.DIVIDER}>/</span>
            <span className={ROUND_SCORE_STYLES.TARGET_SCORE}>
              {targetScore}
            </span>
          </>
        )}
      </div>
      {targetScore && (
        <div className={ROUND_SCORE_STYLES.PROGRESS_BAR}>
          <div
            className={ROUND_SCORE_STYLES.PROGRESS_FILL}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}
    </div>
  )
}

export default RoundScore
