import React, { useState } from 'react'
import { useGame } from '../../context/GameContext'

const DEBUG_STYLES = {
  CONTAINER: 'flex items-center justify-between h-12 p-2 bg-gray-800',
  LEFT_SECTION: 'flex items-center gap-4',
  TOGGLE_BUTTON: 'px-2 py-1 rounded text-sm',
  TOGGLE_ACTIVE: 'bg-amber-500 text-white',
  TOGGLE_INACTIVE: 'bg-gray-200',
  FORM: 'flex gap-2',
  INPUT: 'px-2 py-1 border rounded text-sm',
  SUBMIT_BUTTON: 'px-2 py-1 bg-blue-500 text-white rounded text-sm',
  RESTART_BUTTON: 'px-2 py-1 bg-red-500 text-white rounded text-sm',
}

const DebugPanel = ({ onWordSubmit }) => {
  const { debugMode, toggleDebug, playAgain } = useGame()
  const [inputWord, setInputWord] = useState('')

  const handleDebugSubmit = async e => {
    e.preventDefault()
    if (inputWord.trim()) {
      await onWordSubmit(inputWord)
      setInputWord('')
    }
  }

  return (
    <div id='debug' className={DEBUG_STYLES.CONTAINER}>
      <div className={DEBUG_STYLES.LEFT_SECTION}>
        <button
          onClick={toggleDebug}
          className={`${DEBUG_STYLES.TOGGLE_BUTTON} ${
            debugMode
              ? DEBUG_STYLES.TOGGLE_ACTIVE
              : DEBUG_STYLES.TOGGLE_INACTIVE
          }`}
        >
          Debug
        </button>
        {debugMode && (
          <form onSubmit={handleDebugSubmit} className={DEBUG_STYLES.FORM}>
            <input
              type='text'
              value={inputWord}
              onChange={e => setInputWord(e.target.value)}
              placeholder='Enter word'
              className={DEBUG_STYLES.INPUT}
            />
            <button type='submit' className={DEBUG_STYLES.SUBMIT_BUTTON}>
              Submit
            </button>
          </form>
        )}
      </div>
      <button onClick={playAgain} className={DEBUG_STYLES.RESTART_BUTTON}>
        Restart
      </button>
    </div>
  )
}

export default DebugPanel
