let gameModel = require('../../db/gameSchema')
let  _ = require('lodash')
const controller = {}

controller.addBet = async function (ctx, next) {
  try {
    let liveGame = await gameModel.findOne({status: 'live'})
    let bets = ctx.request.body.bet
    _.each(bets,function (item) {
      liveGame.bets.push(item)
    })

    await liveGame.save()
    ctx.status = 201
    ctx.body = liveGame
  }
  catch (err) {
    ctx.status = 404
    ctx.body = "error"
  }
}


module.exports = controller
