const user = require('../models/user')

exports.getCurrentUser = async (req, res) => {
    // gets current user
    let currUser = {
        username: req.user.name
    }
    res.json(currUser)
}

exports.getUser = async (req, res) => {
    let id = req.params.id
    let currUser = await user.findOne({ userName: id })

    if (!currUser) {
        res.json({
            err: "user dosent exist"
        })
        return
    }

    let resUser = {
        username: currUser.userName,
        posts: currUser.posts
    }

    res.json(resUser)
}
