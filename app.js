const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const server = require('http').createServer(app.callback())
const swagger = require('swagger-injector')
require('dotenv').config()
let io = require('socket.io')(server)

require('./socket/socket')(io)
require('dotenv').config()
require('./game/game')
console.log(process.env.APP_ADDRESS,process.env.APP_PORT)
app.use(swagger.koa({
  path: './api/swagger.json',
  route: '/swagger',
  host: process.env.APP_ADDRESS + ":" + process.env.APP_PORT,
}))
app.use(serve('.'));
server.listen(process.env.APP_PORT, function () {
    console.log("Your server is listening on port", process.env.APP_PORT)
})




