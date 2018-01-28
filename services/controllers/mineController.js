let gameModel = require('../../db/gameSchema')

const controller = {}

controller.addBet = async function (ctx, next) {
  try {
    let liveGame = await gameModel.findOne({status: 'live'})
    liveGame.bets = ctx.request.body
    liveGame.save()
    console.log('update')
    ctx.status = 201
    ctx.body = liveGame
  }
  catch (err) {
    ctx.status = 404
    ctx.body = "error"
  }
}


module.exports = controller
