let gameModel = require('../../db/gameSchema')
let  _ = require('lodash')
const controller = {}
const fs = require('fs')
const path = require('path')

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

controller.getVideo = async function (ctx,next) {
  let videoPath  = path.resolve(__dirname, '2_4_1.mkv')
  const fstat = await stat(videoPath);

  if (fstat.isFile()) {
    ctx.body = fs.createReadStream(videoPath);
  }
  // const stat = fs.statSync(videoPath)
  // const fileSize = stat.size
  // const range = ctx.req.headers.range
  // if (range) {
  //   const parts = range.replace(/bytes=/, "").split("-")
  //   const start = parseInt(parts[0], 10)
  //   const end = parts[1]
  //     ? parseInt(parts[1], 10)
  //     : fileSize-1
  //   const chunksize = (end-start)+1
  //   const file = fs.createReadStream(videoPath, {start, end})
  //   const head = {
  //     'Content-Range': `bytes ${start}-${end}/${fileSize}`,
  //     'Accept-Ranges': 'bytes',
  //     'Content-Length': chunksize,
  //     'Content-Type': 'video/mkv',
  //   }
  //   ctx.writeHead(206, head);
  //   file.pipe(ctx.response);
  // } else {
  //   const head = {
  //     'Content-Length': fileSize,
  //     'Content-Type': 'video/mkv',
  //   }
  //   ctx.res.writeHead(200, head)
  //   fs.createReadStream(videoPath).pipe(ctx.res)
  // }
}

function stat(file) {
  return new Promise(function(resolve, reject) {
    fs.stat(file, function(err, stat) {
      if (err) {
        reject(err);
      } else {
        resolve(stat);
      }
    });
  });
}
module.exports = controller
