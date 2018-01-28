const Router = require('koa-router')
const mineRouter = new Router
const mineController = require('./controllers/mineController')



mineRouter.post('/bet',mineController.addBet)


module.exports = mineRouter
