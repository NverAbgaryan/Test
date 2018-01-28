const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static')
const server = require('http').createServer(app.callback())
const swagger = require('swagger-injector')
const BodyParser    = require('koa-body')
const mineRouter = require('./services/router')

require('dotenv').config()

let io = require('socket.io')(server)
require('./services/socket/socket')(io)

require('dotenv').config()
require('./game/game')

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  ctx.set('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Authorization');

  if(ctx.method === 'OPTIONS') {
    ctx.status = 204;
  }else{
    await next();
  }
});

app.use(swagger.koa({
  path: './api/swagger.json',
  route: '/swagger',
  host: process.env.APP_ADDRESS + ":" + process.env.APP_PORT,
}))
.use(BodyParser())
.use(serve('.'))


app.use(mineRouter.routes());


server.listen(process.env.APP_PORT, function () {
  console.log("Your server is listening on port", process.env.APP_PORT)
})
