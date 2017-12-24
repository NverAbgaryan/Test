let mongoose = require('mongoose')
mongoose.Promise = require('bluebird');

module.exports = () => {

    mongoose.connect('mongodb://localhost/game', {
        useMongoClient: true,
        /* other options */
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + process.env.APP_DB_HOST)
    })


    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err)
    })


    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected')
    })

// If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination')
            process.exit(0)
        })
    })

}
