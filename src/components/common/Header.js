import React from 'react'
import AnimatedScoreDisplay from './AnimatedScoreDisplay'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_PLAYS_PER_ROUND,
} from '../../constants/gameConstants'
import Tooltip from './Tooltip'

const ROUND_SCORE_STYLES = {
  CONTAINER: 'text-center flex-1 p-4',
  TOP: 'flex flex-row items-center justify-between gap-2',
  BOTTOM: '',
  LABEL: 'text-lg font-semibold text-gray-600',
  READOUT:
    'border border-2 border-[rgba(0,0,0,0.25)] text-xl font-semibold leading-none text-white p-2 rounded-md',
  PLAYS: 'bg-blue-500',
  DISCARDS: 'bg-red-500',
  SCORE_CONTAINER: 'text-3xl font-bold flex items-center justify-center gap-2',
  CURRENT_SCORE: 'text-blue-600',
  DIVIDER: 'text-gray-400',
  TARGET_SCORE: 'text-green-600',
  PROGRESS_BAR: 'mt-2 h-2 bg-gray-200 rounded-full overflow-hidden',
  PROGRESS_FILL: `h-full bg-blue-600 transition-all duration-1000 ease-in-out`,
}

const Header = ({
  roundNumber,
  roundScore,
  targetScore,
  discardsUsed,
  playsUsed,
}) => {
  const progressPercentage = Math.min((roundScore / targetScore) * 100, 100)
  const score = Number(
    typeof roundScore === 'object' ? roundScore.score : roundScore,
  )

  return (
    <div id='header' className='flex'>
      <div className={ROUND_SCORE_STYLES.CONTAINER}>
        <div className={ROUND_SCORE_STYLES.TOP}>
          <AnimatedScoreDisplay
            label={`Round ${roundNumber} Score`}
            score={score}
            targetScore={targetScore}
          />

          <Tooltip
            content={`${MAX_PLAYS_PER_ROUND - playsUsed} play(s) remaining`}
          >
            <div
              className={`${ROUND_SCORE_STYLES.READOUT} ${ROUND_SCORE_STYLES.PLAYS}`}
            >
              {MAX_PLAYS_PER_ROUND - playsUsed}
            </div>
          </Tooltip>
          <Tooltip
            content={`${
              MAX_DISCARDS_PER_ROUND - discardsUsed
            } discard(s) remaining`}
          >
            <div
              className={`${ROUND_SCORE_STYLES.READOUT} ${ROUND_SCORE_STYLES.DISCARDS}`}
            >
              {MAX_DISCARDS_PER_ROUND - discardsUsed}
            </div>
          </Tooltip>
        </div>
        <div className={ROUND_SCORE_STYLES.BOTTOM}>
          {targetScore && (
            <div className={ROUND_SCORE_STYLES.PROGRESS_BAR}>
              <div
                className={ROUND_SCORE_STYLES.PROGRESS_FILL}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
