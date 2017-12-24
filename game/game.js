'use strict'

require('../db/db')()

let gameModel = require('../db/gameSchema')

const dogCount = 6

let generateOdds = function () {
  let oddsForFirstPlace = []
  let oddsForSecondPlace = []
  let oddsForThirdPlace = []

  let oddsForFirstPlaceNegative = []
  let oddsForSecondPlaceNegative = []
  let oddsForThirdPlaceNegative = []

  let firstPlace = []
  let firstPlaceNegative = []

  let min = 1.7
  let max = 4
  let profit = 0

  let odd2 = []
  let odd3 = []

  for (let i = 0; i < dogCount; ++i) {
    let oddForFirstPlace = getRandomArbitrary(min, max).toFixed(2)
    odd2.push(getRandomArbitrary(min, max))
    odd3.push(getRandomArbitrary(min, max))

    profit += 1 / oddForFirstPlace

    oddsForFirstPlace.push(oddForFirstPlace)
    min = max
    max += 0.5
  }

  console.log(profit)

  if (profit < 1.1 /* 10% income */) { // TODO: Should be moved to env variables.
    throw new Error('Something gone wrong..')
  }

  for (let i = 0; i < odd2.length; ++i) {
    let odd = (1 / (1 / odd2[i] + 1 / oddsForFirstPlace[i])).toFixed(2)
    oddsForSecondPlace.push(odd < 1 ? 1 : odd)
  }

  for (let i = 0; i < odd3.length; ++i) {
    let odd = (1 / (1 / odd3[i] + 1 / odd2[i] + 1 / oddsForFirstPlace[i])).toFixed(2)
    oddsForThirdPlace.push(odd < 1 ? 1 : odd)
  }

  oddsForFirstPlaceNegative = oddsForFirstPlace.map((odd) => {
    let reverse = (1 / (profit - 1 / odd) - 0.02).toFixed(2)

    return reverse < 1 ? 1 : reverse
  })

  oddsForSecondPlaceNegative = oddsForSecondPlace.map((odd) => {
    let reverse = (1 / (profit - 1 / odd) - 0.02).toFixed(2)

    return reverse < 1 ? 1 : reverse
  })

  oddsForThirdPlaceNegative = oddsForThirdPlace.map((odd) => {
    let reverse = (1 / (profit - 1 / odd) - 0.02).toFixed(2)

    return reverse < 1 ? 1 : reverse
  })


  let doubleOdds = []
  for (let i = 0; i < dogCount; ++i) {
    doubleOdds.push([])
    for (let j = 0; j < dogCount; ++j) {
      if (i != j) {
        doubleOdds[i].push((oddsForFirstPlace[i] * oddsForSecondPlace[j]).toFixed(2))
      }
    }
  }

  for (let i = 0; i < dogCount; ++i) {
    for (let j = 0; j < i; ++j) {
      firstPlace.push((1 / (1 / oddsForFirstPlace[i] + 1 / oddsForFirstPlace[j])).toFixed(2))
    }
  }

  oddsForThirdPlaceNegative = oddsForThirdPlace.map((odd) => {
      let reverse = (1 / (profit - 1 / odd) - 0.02).toFixed(2)

      return reverse < 1 ? 1 : reverse
    }
  )

  return {
    singleOdds: {
      positiveOdds: {
        oddsForFirstPlace: oddsForFirstPlace,
        oddsForSecondPlace: oddsForSecondPlace,
        oddsForThirdPlace: oddsForThirdPlace
      },
      negativeOdds: {
        oddsForFirstPlaceNegative: oddsForFirstPlaceNegative,
        oddsForSecondPlaceNegative: oddsForSecondPlaceNegative,
        oddsForThirdPlaceNegative: oddsForThirdPlaceNegative
      }
    },

    doubleOdds: {
      odds_1: doubleOdds[0],
      odds_2: doubleOdds[1],
      odds_3: doubleOdds[2],
      odds_4: doubleOdds[3],
      odds_5: doubleOdds[4],
      odds_6: doubleOdds[5]
    },

    doubleOpportunity: {
      firstPlace: firstPlace,
      firstPlaceNegative: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  }
}

let getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min
}

class Game {

  constructor() {
    console.log('Starting the game...')
    this.winner = {}
  }

  addGame(gameId) {
    return gameModel.count.then((count) => {
      let game = new gameModel({gameId: gameId, odds: JSON.stringify(generateOdds())})
      return game.save()
    })
  }

  calculateResult(first, second, third, bet) {
    return 10 // TODO calculate result
  }

  calculateAmount(first, second, third, bets) {
    if (first == second ||
      first == third ||
      second == third) {
      return -1
    }

    let amount = 0
    bets.forEach((bet) => {
      amount = amount + this.calculateResult(first, second, third, bet)
    })

    return amount
  }

  calculateWinner(currentGame) {
    let bets = currentGame.bets
    let bestAmount = -1

    for (let i = 1; i <= dogCount; ++i) {
      for (let j = 1; j <= dogCount; ++j) {
        for (let k = 1; k <= dogCount; ++k) {
          let amount = this.calculateAmount(i, j, k, bets)
          if (bestAmount < amount) {
            bestAmount = amount
            this.winner = {
              first: i,
              second: j,
              third: k
            }
          }
        }
      }
    }

    // this should not happen
    if (bestAmount = -1) {
      // TODO: notify clients that something gone wrong
    }
    return gameModel.findOne({status: 'live'})
    .then((game)=> {
      game.winner = this.winner
      return game.save()
    })

  }

  getWinner() {
    return this.winner
  }

  addBet(bet) {
    return gameModel.findOne({where: {status: 'live'}})
    .then(function (game) {
      game.bets.push(bet)
      return game.save()
    })
  }
}

global.game = new Game()
