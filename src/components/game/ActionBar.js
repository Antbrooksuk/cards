import React from 'react'
import Button from '../common/Button'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_LETTERS_PER_DISCARD,
} from '../../constants/gameConfig'

const ActionBar = ({
  gameStatus,
  isAnimating,
  isValidating,
  selectedCards,
  discardsUsed,
  canReshuffle,
  debugMode,
  onPlayWord,
  onShuffleHand,
  onReshuffleDeck,
  onDiscardCards,
  onShowRoundEnd,
}) => {
  if (gameStatus === 'roundComplete') {
    return (
      <div className='flex justify-center gap-4'>
        <Button onClick={onShowRoundEnd} variant='primary'>
          Continue
        </Button>
      </div>
    )
  }

  if (gameStatus !== 'playing') {
    return null
  }

  return (
    <div className='flex justify-center gap-4'>
      <Button
        onClick={onPlayWord}
        disabled={
          (!debugMode && selectedCards.length === 0) ||
          isAnimating ||
          isValidating
        }
        variant='primary'
        className='disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Play Word
      </Button>

      <Button
        onClick={onShuffleHand}
        disabled={isValidating || isAnimating}
        variant='secondary'
        className='disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Shuffle Hand
      </Button>

      <Button
        onClick={onReshuffleDeck}
        disabled={!canReshuffle || isValidating || isAnimating}
        variant='secondary'
        className={`${
          !canReshuffle
            ? 'bg-gray-300 text-gray-500'
            : 'bg-yellow-500 hover:bg-yellow-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Reshuffle
      </Button>

      <Button
        onClick={onDiscardCards}
        disabled={
          selectedCards.length === 0 ||
          selectedCards.length > MAX_LETTERS_PER_DISCARD ||
          discardsUsed >= MAX_DISCARDS_PER_ROUND ||
          isAnimating ||
          isValidating
        }
        variant='secondary'
        className='disabled:opacity-50 disabled:cursor-not-allowed'
        title={`${MAX_LETTERS_PER_DISCARD} letters max, ${
          MAX_DISCARDS_PER_ROUND - discardsUsed
        } discards remaining`}
      >
        Discard ({MAX_DISCARDS_PER_ROUND - discardsUsed})
      </Button>
    </div>
  )
}

export default ActionBar
