const gameModel = require('../../db/gameSchema')
const moment = require('moment')

const video = 'video'
const block = 'block'
const odd = 'odd'
const first = 'first'
const second = 'second'
const third = 'third'

let getSettings =  function (currentGame) {
  let start = moment(currentGame.createdDate)
  let diff = moment().diff(start, 'seconds')
  if (diff < 90) {
    return {
      time: diff,
      odds: currentGame.odds,
      status: odd,
      page: first
    }
  } else if (diff < 115) {
    return {
      time: diff,
      odds: currentGame.odds,
      status: odd,
      page: second,
      lastGames: [{
        time: '',
        gameId: '',
        winner: {}
      }]
    }
  } else if (diff < 120) {
    if(!global.game.calculating){
      global.game.calculateWinner(currentGame)
    }
    return {
      time: diff,
      odds: currentGame.odds,
      status: block,
      page: second,
      lastGames: [{
        time: '',
        gameId: '',
        winner: {}
      }]
    }
  } else {
    let winner = global.game.getWinner()
    if (winner && winner.hasOwnProperty('first')) {
      return {
        time: diff,
        odds: currentGame.odds,
        status: video,
        page: third,
        videoUrl: '',
        winner: winner
      }
    } else {
      return {
        time: diff,
        odds: currentGame.odds,
        status: block,
        page: second,
      }
    }

  }
}

module.exports = (io) => {

  io.on('connection', function (client) {
    console.log('Client connected...')

    setInterval(function () {
      gameModel.findOne({status: 'live'})
      .then(function (currentGame) {
        client.emit('odds', getSettings(currentGame))
      })
    }, 1000)
    client.on('join', function (mess) {
      console.log(mess)
    })

  })
}
