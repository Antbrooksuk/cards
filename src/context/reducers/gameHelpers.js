import { MAX_HAND_SIZE } from '../../constants/gameConstants'
import { LEGENDARY_LETTERS } from '../../constants/cardConstants'
import { shuffleArray, dealCards, hasVowels, createDeck } from '../../utils/cardUtils'
import { calculateWordTotalScore } from '../../utils/scoreUtils'

export const handleNewRound = (deck, handSize = MAX_HAND_SIZE) => {
  const shuffledDeck = shuffleArray(deck)
  const { dealtCards, remainingDeck } = dealCards(shuffledDeck, handSize)
  const hasVowelsInHand = hasVowels(dealtCards)

  return {
    deck: remainingDeck,
    playerHand: dealtCards.map(card => ({ ...card, isNew: true })),
    canReshuffle: !hasVowelsInHand,
  }
}

export const handleWordValidation = (state, word, isValid, validation) => {
  const result = {
    words: state.wordHistory.valid,
    invalidWords: state.wordHistory.invalid,
  }

  if (isValid) {
    const { score: wordScore } = calculateWordTotalScore(
      word,
      validation.wordType,
    )
    result.score = Number(state.score) + wordScore
    result.roundScore = Number(state.roundScore) + wordScore
    result.words = [...result.words, { word, type: validation.wordType }]
  } else {
    result.invalidWords = [...result.invalidWords, word]
  }

  result.all = [
    ...state.wordHistory.all,
    {
      word,
      type: isValid ? validation.wordType : null,
      round: state.currentRound,
    },
  ]

  return result
}

export const handleCardDealing = (state, selectedIndices) => {
  const usedCards = selectedIndices.map(index => state.playerHand[index])
  const remainingHand = state.playerHand.filter(
    (_, index) => !selectedIndices.includes(index)
  )
  const updatedDeck = [...state.deck, ...usedCards]
  const dealResult = dealCards(updatedDeck, selectedIndices.length)

  const newHand = [
    ...remainingHand.map(card => ({ ...card, isNew: false })),
    ...dealResult.dealtCards.map(card => ({ ...card, isNew: true })),
  ]

  return {
    deck: dealResult.remainingDeck,
    playerHand: newHand,
    newCardCount: dealResult.dealtCards.length,
  }
}

export const hasLegendaryLetter = (text) => {
  return text.split('').some(letter => LEGENDARY_LETTERS.includes(letter))
}

export const getLegendaryLetterPlayed = (state, isValid) => {
  const hasLegendaryInWord = state.wordHistory.current.hasLegendaryLetter
  return hasLegendaryInWord && isValid
    ? state.wordHistory.current.text
        .split('')
        .find(letter => LEGENDARY_LETTERS.includes(letter))
    : state.legendaryLetterPlayed
}