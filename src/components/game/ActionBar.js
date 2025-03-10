import React from 'react'
import Button from '../common/Button'
import Tooltip from '../common/Tooltip'
import ShuffleIcon from '../common/ShuffleIcon'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_PLAYS_PER_ROUND,
} from '../../constants/gameConstants'
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
  animatingCards,
}) => {
  if (gameStatus === 'roundComplete') {
    return (
      <div className='action-bar'>
        <div className='action-bar-inner'>
          <Button onClick={onShowRoundEnd} variant='primary'>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  if (gameStatus !== 'playing') {
    return null
  }

  return (
    <div className='action-bar'>
      <div className='action-bar-inner'>
        {canReshuffle ? (
          <>
            <Button
              onClick={onReshuffleDeck}
              disabled={!canReshuffle || isValidating || isAnimating}
              variant='secondary'
              className='bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Reshuffle Deck
            </Button>
            <p>You have no vowels, draw a new hand</p>
          </>
        ) : (
          <>
            <Button
              onClick={onPlayWord}
              disabled={
                selectedCards.length < WORD_LENGTH.MIN ||
                debugMode ||
                isAnimating ||
                isValidating ||
                playsUsed >= MAX_PLAYS_PER_ROUND
              }
              variant='primary'
              className='disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Play Word
            </Button>

            <Tooltip content='Reorder your hand'>
              <Button
                onClick={onShuffleHand}
                disabled={
                  isValidating ||
                  isAnimating ||
                  debugMode ||
                  animatingCards.isDealing
                }
                variant='secondary'
                className='disabled:opacity-50 disabled:cursor-not-allowed p-2'
              >
                <ShuffleIcon />
              </Button>
            </Tooltip>

            <Button
              onClick={onDiscardCards}
              disabled={
                debugMode ||
                selectedCards.length === 0 ||
                selectedCards.length > MAX_DISCARDS_PER_ROUND - discardsUsed ||
                discardsUsed >= MAX_DISCARDS_PER_ROUND ||
                isAnimating ||
                isValidating
              }
              variant='discard'
              className='disabled:opacity-50 disabled:cursor-not-allowed'
            >
              Discard
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default ActionBar
