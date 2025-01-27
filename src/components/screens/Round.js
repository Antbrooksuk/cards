import React, { useEffect, useState } from 'react'
import { useGame } from '../../context/GameContext'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import BuffBar from '../common/BuffBar'
import HandBuilder from '../game/HandBuilder'
import Header from '../common/Header'
import DebugPanel from '../debug/DebugPanel'
import WordList from '../game/WordList'
import DeckDisplay from '../debug/DeckDisplay'
import ActionBar from '../game/ActionBar'
import useCardAnimation from '../../hooks/useCardAnimation'

const Round = ({ className = '' }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [animatingIndices, setAnimatingIndices] = useState([])
  const [keyboardAnimating, setKeyboardAnimating] = useState(false)
  const [lastKeyTime, setLastKeyTime] = useState(0)
  const KEY_DEBOUNCE = 100 // milliseconds

  const {
    wordHistory,
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
    discardCards,
    canReshuffle,
    reshuffleHand,
    reshuffleDeck,
    gameStatus,
    showRoundEnd,
    discardsUsed,
    playsUsed,
    debugMode,
    clearNewFlags,
  } = useGame()

  const animatingCards = useCardAnimation(playerHand, clearNewFlags)

  // Reset keyboard animation state when hand changes
  useEffect(() => {
    setKeyboardAnimating(false)
  }, [playerHand])

  useEffect(() => {
    const handleKeyDown = async e => {
      const hasAnimatingCards = animatingCards.size > 0
      const now = Date.now()
      if (
        gameStatus !== 'playing' ||
        isValidating ||
        isAnimating ||
        debugMode ||
        hasAnimatingCards ||
        now - lastKeyTime < KEY_DEBOUNCE
      )
        return

      setLastKeyTime(now)

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
          setKeyboardAnimating(true)
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
    debugMode,
    animatingCards,
  ])

  const handleWordSubmit = async debugWord => {
    // Early returns for invalid states
    if (debugMode) {
      if (!debugWord || !debugWord.length) return
      setIsValidating(true)
      const validation = await addWord(debugWord)
      setIsValidating(false)
      if (!validation.isValid) {
        console.log('Invalid word:', validation.reason)
      }
      return
    }

    // Normal mode handling
    if (!currentWord.length || isAnimating) return
    setIsAnimating(true)

    // Start animations for each letter sequentially
    for (let i = 0; i < selectedCards.length; i++) {
      setAnimatingIndices(prev => [...prev, i])
      // Wait for 500ms between each letter animation
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Wait for the last animation to complete
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset animation states
    setAnimatingIndices([])
    setIsAnimating(false)

    // Now validate the word
    setIsValidating(true)
    const validation = await addWord(currentWord)
    setIsValidating(false)

    // Clear word after validation (so selectedCards are available for invalid words)
    clearWord()

    if (!validation.isValid) {
      console.log('Invalid word:', validation.reason)
    }
  }

  return (
    <>
      <DebugPanel onWordSubmit={handleWordSubmit} />
      <div className='game-container flex flex-col gap-4'>
        <Header
          roundNumber={roundNumber}
          roundScore={roundScore}
          targetScore={targetScore}
          totalScore={score}
          discardsUsed={discardsUsed}
          playsUsed={playsUsed}
        />
        <BuffBar />
        <HandBuilder
          isAnimating={isAnimating}
          isValidating={isValidating}
          animatingIndices={animatingIndices}
          forceHandAnimating={keyboardAnimating}
          onAnimationComplete={() => {
            setAnimatingIndices([])
            // Removed setIsAnimating(false) from here since it's managed in handleWordSubmit
          }}
        />
        <ActionBar
          gameStatus={gameStatus}
          isAnimating={isAnimating || animatingCards.size > 0}
          isValidating={isValidating}
          selectedCards={selectedCards}
          discardsUsed={discardsUsed}
          playsUsed={playsUsed}
          canReshuffle={canReshuffle}
          debugMode={debugMode}
          onPlayWord={handleWordSubmit}
          onShuffleHand={reshuffleHand}
          onReshuffleDeck={reshuffleDeck}
          onDiscardCards={discardCards}
          onShowRoundEnd={showRoundEnd}
        />
        <WordList
          allWords={wordHistory.all
            .filter(word => word.round === roundNumber)
            .sort((a, b) => a.timestamp - b.timestamp)}
        />
      </div>
      {debugMode && <DeckDisplay />}
    </>
  )
}

export default Round
