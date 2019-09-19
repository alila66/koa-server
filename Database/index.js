const mongoose = require('mongoose')
const config = require('../config')

async function dbOpen() {
    // console.log(`mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}/${DB_NAME}`)
    try {
        // mongoose.connect(`mongodb://admin:xjkj123@127.0.0.1/admin`, { useNewUrlParser: true });
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PWD}@${config.DB_HOST}/${config.DB_NAME}`, { useNewUrlParser: true });

    } catch {
        console.log('connecting error!')
    }

    mongoose.connection.on('error', console.error.bind(console, 'connection error!\n'))
    mongoose.connection.once('open', () => {
        console.log("we're connected!")
    });
}

function dbClose() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
    });
}

module.exports = { dbOpen, dbClose }