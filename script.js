require('./game/game')
let gameModel = require('./db/gameSchema')

gameModel.findOne({status: 'live'}).then(function (result) {

    if (result) {
        result.status = 'finished'
        result.save()
    }

    let gameId = result ? result.gameId + 1 : 1
    global.game.addGame(gameId).then(function () {
        process.exit(1)
    })

})

