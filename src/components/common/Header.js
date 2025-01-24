import React from 'react'
import RoundScore from '../game/RoundScore'
import ScoreDisplay from './ScoreDisplay'

const Header = ({ roundNumber, roundScore, targetScore, totalScore }) => {
  return (
    <div id='header' className='flex pt-4 '>
      <RoundScore
        score={roundScore}
        roundNumber={roundNumber}
        targetScore={targetScore}
      />
      {/* <ScoreDisplay score={totalScore} label='Total Score' /> */}
    </div>
  )
}

export default Header
