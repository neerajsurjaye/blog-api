const posts = require('../models/posts')
const comment = require('../models/comment')
const scripts = require('./scripts')

exports.addComment = async (req, res) => {
    let id = req.params.postId
    console.log(req.params);
    let isValid = scripts.isValidObjectId(id)
    if (!isValid) {
        res.json({
            err: "Invalid Id"
        })
        return
    }

    console.log(req.user);
    let newComment = new comment({
        desc: req.body.desc,
        user: req.user._id
    })

    newComment = await newComment.save()
    console.log(newComment);

    let currPost = await posts.findByIdAndUpdate(id, { $push: { comments: newComment._id } })


    res.json({
        success: "Success"
    })
}