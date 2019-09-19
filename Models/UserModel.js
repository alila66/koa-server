const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, require: true},
    password: { type: String, require: true},
    avatar: { type: String},
    date: { type: Date, default: Date.now },
    flag: { type: Boolean, default: true },
    meta: { votes: Number, favs: Number}
})

module.exports = UserModel = mongoose.model('users', userSchema)