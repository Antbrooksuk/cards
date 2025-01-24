import React from 'react'
import RoundScore from '../game/RoundScore'
import ScoreDisplay from './ScoreDisplay'

const Header = ({ roundNumber, roundScore, targetScore, totalScore }) => {
  return (
    <div id='header' className='flex p-4 border-b justify-between items-center'>
      <div className='text-xl font-bold'>Round {roundNumber}</div>
      <div className='flex gap-8'>
        <RoundScore score={roundScore} targetScore={targetScore} />
        <ScoreDisplay score={totalScore} label='Total Score' />
      </div>
    </div>
  )
}

export default Header
