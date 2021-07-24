const mongoose = require('mongoose')

let user = new mongoose.Schema({
    userName: String,
    password: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }]
})

module.exports = mongoose.model('user', user)