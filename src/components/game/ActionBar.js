import React from 'react'
import Button from '../common/Button'
import Tooltip from '../common/Tooltip'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_LETTERS_PER_DISCARD,
  MAX_PLAYS_PER_ROUND,
} from '../../constants/gameConfig'
import { WORD_LENGTH } from '../../constants/wordConstants'

const ActionBar = ({
  gameStatus,
  isAnimating,
  isValidating,
  selectedCards,
  discardsUsed,
  playsUsed,
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
      <Tooltip content={`${MAX_PLAYS_PER_ROUND - playsUsed} plays remaining`}>
        <Button
          onClick={onPlayWord}
          disabled={
            (!debugMode && selectedCards.length < WORD_LENGTH.MIN) ||
            isAnimating ||
            isValidating ||
            playsUsed >= MAX_PLAYS_PER_ROUND
          }
          variant='primary'
          className='disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Play Word ({MAX_PLAYS_PER_ROUND - playsUsed})
        </Button>
      </Tooltip>

      <Tooltip content='reorder your hand'>
        <Button
          onClick={onShuffleHand}
          disabled={isValidating || isAnimating}
          variant='secondary'
          className='disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Shuffle Hand
        </Button>
      </Tooltip>

      {canReshuffle ? (
        <Tooltip content='You have no vowels, draw a new hand'>
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
        </Tooltip>
      ) : (
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
      )}

      <Tooltip
        content={`${MAX_DISCARDS_PER_ROUND - discardsUsed} discards remaining`}
      >
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
        >
          Discard ({MAX_DISCARDS_PER_ROUND - discardsUsed})
        </Button>
      </Tooltip>
    </div>
  )
}

export default ActionBar
