const mongoose = require('mongoose')

let posts = new mongoose.Schema({
    title: String,
    desc: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('posts', posts)