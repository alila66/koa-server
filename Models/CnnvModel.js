const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

const cnnvSchema = new mongoose.Schema({
    title: { type: String, require: true},
    showinfo: { type: String, require: true},
    uri: { type: String, require: true},
    date: { type: Date, default: Date.now },
    flag: { type: Boolean, default: true },
    meta: {
        votes: Number,
        favs: Number
    }
})

// cnnvSchema.set('autoIndex', false)

const CnnvModel = mongoose.model('cnnvs', cnnvSchema)

// function saveData(data) {
//     // const cnnv = new CnnvModel({
//     //     title: data.title,
//     //     showinfo: data.showinfo,
//     //     uri: data.uri,
//     // })
//     return CnnvModel.insertMany(data)
// }

// function find() {
//      console.log(CnnvModel.findOne())
// }

module.exports = CnnvModel