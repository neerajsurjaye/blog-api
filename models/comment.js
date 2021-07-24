const mongoose = require('mongoose')

let comment = new mongoose.Schema({
    desc: String,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongoose.model('comment', comment)