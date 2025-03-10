import React from 'react'
import AnimatedScoreDisplay from '../common/AnimatedScoreDisplay'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_PLAYS_PER_ROUND,
} from '../../constants/gameConstants'

const ROUND_SCORE_STYLES = {
  CONTAINER: 'text-center flex-1 p-4',
  TOP: 'flex flex-row items-center justify-between gap-2',
  BOTTOM: '',
  LABEL: 'text-lg font-semibold text-gray-600',
  READOUT:
    'border border-2 border-[rgba(0,0,0,0.25)] text-md font-semibold leading-none w-8 text-white p-1 rounded-md',
  PLAYS: 'bg-blue-500',
  DISCARDS: 'bg-red-500',
  SCORE_CONTAINER: 'text-3xl font-bold flex items-center justify-center gap-2',
  CURRENT_SCORE: 'text-blue-600',
  DIVIDER: 'text-gray-400',
  TARGET_SCORE: 'text-green-600',
  PROGRESS_BAR: 'mt-4 h-2 bg-gray-200 rounded-full overflow-hidden',
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
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-end items-center gap-2'>
              Plays:{' '}
              <div
                className={`${ROUND_SCORE_STYLES.READOUT} ${ROUND_SCORE_STYLES.PLAYS}`}
              >
                {MAX_PLAYS_PER_ROUND - playsUsed}
              </div>
            </div>
            <div className='flex flex-row justify-end items-center gap-2'>
              Discards:{' '}
              <div
                className={`${ROUND_SCORE_STYLES.READOUT} ${ROUND_SCORE_STYLES.DISCARDS}`}
              >
                {MAX_DISCARDS_PER_ROUND - discardsUsed}
              </div>
            </div>
          </div>
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
