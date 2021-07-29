const user = require('../models/user')

exports.getCurrentUser = async (req, res) => {
    // gets current user
    let currUser = {
        success: "Success",
        data: {
            username: req.user.userName,
            id: req.user._id
        }
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

    //console.log("Res User");

    res.json(resUser)
}
