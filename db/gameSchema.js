let mongoose = require('mongoose')
let Schema = mongoose.Schema

let Games = new Schema({
  gameId: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['live', 'finished'],
    default: 'live'
  },
  bets: [{
    betId: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true
    },
    secondType: {
      type: String,
      required: true
    },
    profit: {
      type: Number,
      required: true
    },
    position: {
      type: Object,
      required: true
    },
    betType: {
      type: String,
      required: true
    }
  }],
  odds: {
    type: String,
    required: true
  },
  winner: {
    type: Object
  },
  createdDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  modifiedDate: {
    type: Date,
    required: true,
    default: Date.now
  }

}, {
  collection: 'Game'
})


Games.pre('save', function (next) {
  this.modifiedDate = new Date
  next()
})


let GamesModel = mongoose.model('Game', Games)

module.exports = GamesModel

module.exports.count = GamesModel.find({}).count().then(function (count) {
  return count
})
