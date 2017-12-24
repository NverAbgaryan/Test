const Koa = require('koa')
const app = new Koa()
const views = require('koa-render-view')
const path = require('path')
const serve = require('koa-static')
const server = require('http').createServer(app.callback())
let io = require('socket.io')(server)

require('./socket/socket')(io)
require('dotenv').config()
require('./game/game')

app.use(views(path.join(__dirname, '/dist')))
app.use(serve('.'));
app.use(async function ({render}, next) {
    await render('index')
})
server.listen(process.env.APP_PORT, function () {
    console.log("Your server is listening on port", process.env.APP_PORT)
})




