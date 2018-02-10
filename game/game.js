'use strict'

require('../db/db')()

let gameModel = require('../db/gameSchema')

const dogCount = 6

let getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min
}

let generateOdds = function () {
  let oddsForFirstPlace = []
  let oddsForSecondPlace = []
  let oddsForThirdPlace = []

  let oddsForFirstPlaceNegative = []
  let oddsForSecondPlaceNegative = []
  let oddsForThirdPlaceNegative = []

  let firstPlace = []
  let firstPlaceNegative = []

  let min = 2.7
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

  oddsForFirstPlace = oddsForFirstPlace.sort(function() {
    return 0.5 - Math.random();
  });

  let idx1 = oddsForFirstPlace.indexOf(Math.min(...oddsForFirstPlace));


  console.log(`The percentage of profit is ${profit}`)

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

  firstPlaceNegative = firstPlace.map((odd) => {
    let reverse = (1 / (profit - 1 / odd) - 0.02).toFixed(2)

    return reverse < 1 ? 1 : reverse
  })

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
      firstPlaceNegative: firstPlaceNegative
    }
  }
}

class Game {

  constructor() {
    console.log('Starting the game...')
    this.winner = {}
    this.calculating = false
  }

  addGame(gameId) {
    this.calculating = false
    return gameModel.count.then((count) => {
      let game = new gameModel({gameId: gameId, odds: JSON.stringify(generateOdds())})
      return game.save()
    })
  }

  calculateResult(first, second, third, bet) {
    let win = 0
    if (bet.betType == 'single') {
      if (bet.secondType == 'double') {
        if (first == bet.position.vertical && second == bet.position.horizontal) {
          win = bet.profit
        }
      }
      else if (bet.secondType == 'positive') {
        if (bet.position.horizontal == 1) {
          if (bet.position.vertical === first) {
            win = bet.profit
          }
        }
        else if (bet.position.horizontal == 2) {
          if (bet.position.vertical === second) {
            win = bet.profit
          }
        }
        else if (bet.position.horizontal == 3) {
          if (bet.position.vertical === third) {
            win = bet.profit
          }
        }
      }
      else if (bet.secondType == 'negative') {
        if (bet.position.horizontal == 1) {
          if (bet.position.vertical !== first) {
            win = bet.profit
          }
        }
        else if (bet.position.horizontal == 2) {
          if (bet.position.vertical !== second) {
            win = bet.profit
          }
        }
        else if (bet.position.horizontal == 3) {
          if (bet.position.vertical !== third) {
            win = bet.profit
          }
        }
      }
    }
    else if (bet.betType == 'double') {
      if (bet.secondType == 'positive') {
        if (first === bet.position.horizontal || first === bet.position.vertical) {
          win = bet.profit
        }
      }
      else if (bet.secondType == 'negative') {
        if (first !== bet.position.horizontal && first !== bet.position.vertical) {
          win = bet.profit
        }
      }
    }

    return win
  }

  calculateAmount(first, second, third, bets) {
    let amount = 0
    for(let i = 0; i < bets.length; ++i) {
      amount = amount + this.calculateResult(first, second, third, bets[i])
    }

    return amount
  }

  calculateWinner(currentGame) {
    this.calculating = true
    let bets = currentGame.bets
    let minAmount = Number.MAX_VALUE
    let winner = {}

    for (let i = 1; i <= dogCount; ++i) {
      for (let j = 1; j <= dogCount; ++j) {
        for (let k = 1; k <= dogCount; ++k) {
          if (i != j && i != k && j != k) {
            let amount = this.calculateAmount(i, j, k, bets)
            if (minAmount > amount) {
              minAmount = amount
              winner = {
                first: i,
                second: j,
                third: k
              }
            }
          }
        }
      }
    }

    // this should not happen
    if (minAmount == Number.MAX_VALUE) {
      // TODO: notify clients that something gone wrong
    }
    console.log(winner)
    console.log(minAmount)
    gameModel.update({status: 'live'}, {$set: {winner: winner}}).then(function (res) {
      console.log(res)
    })
  }

   getWinner() {
    return new Promise(function (resulv,reject) {
      gameModel.findOne({status: 'live'}).then(function (game) {

        resulv(game.winner)
      })
    })

  }

  addBet(bet) {
    return gameModel.findOne({status: 'live'})
    .then(function (game) {
      game.bets.push(bet)
      return game.save()
    })
  }
}

global.game = new Game()
