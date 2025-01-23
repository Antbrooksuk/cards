import React, { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import {
  MAX_DISCARDS_PER_ROUND,
  MAX_LETTERS_PER_DISCARD,
  LEGENDARY_LETTERS,
} from '../../constants/gameConfig'
import GameBoard from '../game/GameBoard'
import Hand from '../game/Hand'
import DeckDisplay from '../game/DeckDisplay'
import WordBuilder from '../game/WordBuilder'

const Round = ({ className = '' }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [animatingIndices, setAnimatingIndices] = useState([])

  const {
    words,
    invalidWords,
    score,
    roundScore,
    currentRound: roundNumber,
    currentWord,
    targetScore,
    playerHand,
    selectedCards,
    addWord,
    addLetter,
    removeLetter,
    clearWord,
    endRound,
    discardCards,
    canReshuffle,
    reshuffleHand,
    gameStatus,
    showRoundEnd,
    discardsUsed,
  } = useGame()

  useEffect(() => {
    const handleKeyDown = async e => {
      if (gameStatus !== 'playing' || isValidating || isAnimating) return

      if (e.key === 'Enter' && currentWord) {
        await handleWordSubmit()
      } else if (e.key === 'Backspace') {
        removeLetter()
      } else if (
        e.key.length === 1 &&
        (e.key.match(/[a-zA-Z]/) || LEGENDARY_LETTERS.includes(e.key))
      ) {
        const letter = e.key.toLowerCase()
        // Find first available card with matching letter
        const cardIndex = playerHand.findIndex(
          (card, index) =>
            !selectedCards.includes(index) &&
            card.letter.toLowerCase() === letter,
        )
        if (cardIndex !== -1) {
          addLetter(letter, cardIndex)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    addWord,
    addLetter,
    removeLetter,
    clearWord,
    currentWord,
    playerHand,
    selectedCards,
    isValidating,
    isAnimating,
    gameStatus,
  ])

  const handleWordSubmit = async () => {
    if (currentWord.length === 0 || isAnimating) return

    setIsAnimating(true)

    // Start animations for each letter sequentially
    for (let i = 0; i < selectedCards.length; i++) {
      setAnimatingIndices(prev => [...prev, i])
      // Wait for 500ms between each letter animation
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Wait for the last animation to complete
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset animation states and prepare for validation
    setAnimatingIndices([])
    setIsAnimating(false)
    setIsValidating(true)

    // Store the word
    const wordToValidate = currentWord

    // Submit the word and get validation
    const validation = await addWord(wordToValidate)
    setIsValidating(false)

    // Only clear word after validation (so selectedCards are available for invalid words)
    clearWord()

    if (!validation.isValid) {
      console.log('Invalid word:', validation.reason)
    }
  }

  return (
    <div className={`min-h-screen py-8 ${className}`}>
      <GameBoard
        words={words}
        invalidWords={invalidWords}
        score={score}
        roundScore={roundScore}
        roundNumber={roundNumber}
        targetScore={targetScore}
      />

      <div className='game-container space-y-6'>
        <WordBuilder
          isAnimating={isAnimating}
          isValidating={isValidating}
          animatingIndices={animatingIndices}
          onAnimationComplete={() => {
            setAnimatingIndices([])
            setIsAnimating(false)
          }}
        />
        <Hand isValidating={isValidating} />
        <div className='flex justify-center gap-4 mb-6'>
          {gameStatus === 'playing' ? (
            <>
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600'
                disabled={
                  selectedCards.length === 0 || isAnimating || isValidating
                }
                onClick={handleWordSubmit}
              >
                Play Word
              </button>
              <button
                className='px-4 py-2 bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600'
                disabled={
                  selectedCards.length === 0 ||
                  selectedCards.length > MAX_LETTERS_PER_DISCARD ||
                  discardsUsed >= MAX_DISCARDS_PER_ROUND ||
                  isValidating
                }
                onClick={discardCards}
                title={`${MAX_LETTERS_PER_DISCARD} letters max, ${MAX_DISCARDS_PER_ROUND - discardsUsed} discards remaining`}
              >
                Discard ({MAX_DISCARDS_PER_ROUND - discardsUsed})
              </button>
              <button
                onClick={reshuffleHand}
                disabled={!canReshuffle || isValidating}
                className={`px-4 py-2 rounded-lg ${
                  canReshuffle
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reshuffle
              </button>
            </>
          ) : (
            gameStatus === 'roundComplete' && (
              <button
                onClick={showRoundEnd}
                className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
              >
                Continue
              </button>
            )
          )}
        </div>
        <DeckDisplay />
      </div>
    </div>
  )
}

export default Round
