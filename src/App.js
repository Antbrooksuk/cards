import React from 'react'
import { GameProvider, useGame } from './context/GameContext'
import Welcome from './components/screens/Welcome'
import Round from './components/screens/Round'
import RoundEnd from './components/screens/RoundEnd'
import GameOver from './components/screens/GameOver'
import useWordValidation from './hooks/useWordValidation'

const GameScreen = () => {
  const {
    gameStatus,
    currentRound,
    timeLeft,
    score,
    roundScore,
    words,
    allWords,
    targetScore,
    startGame,
    addWord,
    startNextRound,
    playAgain,
    updateTime,
  } = useGame()

  const { validateWord } = useWordValidation()

  const handleWordSubmit = word => {
    const validation = validateWord(word)
    if (validation.isValid) {
      addWord(validation.word)
    }
  }

  switch (gameStatus) {
    case 'welcome':
      return <Welcome onStartGame={startGame} />

    case 'playing':
    case 'roundComplete':
      return (
        <Round
          words={words}
          score={score}
          timeLeft={timeLeft}
          roundNumber={currentRound}
          onWordSubmit={handleWordSubmit}
          onTimeUp={updateTime}
        />
      )

    case 'roundEnd':
      return (
        <RoundEnd
          words={words}
          roundScore={roundScore}
          totalScore={score}
          roundNumber={currentRound}
          targetScore={targetScore}
          onNextRound={startNextRound}
        />
      )

    case 'gameOver':
      return (
        <GameOver
          finalScore={score}
          totalWords={allWords.length}
          onPlayAgain={playAgain}
        />
      )

    default:
      return null
  }
}

const App = () => {
  return (
    <GameProvider>
      <div className='min-h-screen bg-gray-100'>
        <GameScreen />
      </div>
    </GameProvider>
  )
}

export default App
