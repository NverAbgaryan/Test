const gameModel = require('../../db/gameSchema')
const moment = require('moment')

const video = 'video'
const block = 'block'
const odd = 'odd'
const first = 'first'
const second = 'second'
const third = 'third'

let getSettings = function (currentGame) {
  return new Promise(function (resolve, reject) {

    let start = moment(currentGame.createdDate)
    let diff = moment().diff(start, 'seconds')
    if (diff < 90) {
      global.game.calculating = false
      return resolve({
        time: diff,
        odds: currentGame.odds,
        status: odd,
        page: first
      })
    } else if (diff < 115) {
      return resolve({
        time: diff,
        odds: currentGame.odds,
        status: odd,
        page: second,
        lastGames: [{
          time: '',
          gameId: '',
          winner: {}
        }]
      })
    } else if (diff < 120) {
      if (!global.game.calculating) {
        global.game.calculateWinner(currentGame)
      }
      return resolve({
        time: diff,
        odds: currentGame.odds,
        status: block,
        page: second,
        lastGames: [{
          time: '',
          gameId: '',
          winner: {}
        }]
      })
    } else {
      return global.game.getWinner().then(function (winner) {
        console.log(winner)
        if (winner && winner.hasOwnProperty('first')) {
          return resolve({
            time: diff,
            odds: currentGame.odds,
            status: video,
            page: third,
            videoUrl: '',
            winner: winner
          })
        } else {
          return resolve({
            time: diff,
            odds: currentGame.odds,
            status: block,
            page: second,
          })
        }
      })


    }
  })

}

module.exports = (io) =>
{

  io.on('connection', function (client) {
    console.log('Client connected...')

    setInterval(function () {
      gameModel.findOne({status: 'live'})
      .then(function (currentGame) {
        getSettings(currentGame).then(function (result) {
          client.emit('odds',result )
        })
      })
    }, 1000)
    client.on('join', function (mess) {
      console.log(mess)
    })

  })
}
