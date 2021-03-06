const posts = require('../models/posts')
const user = require('../models/user')
const comment = require('../models/comment')
const scripts = require('./scripts')

exports.addPost = async (req, res) => {
    //adds posts
    let newPost = new posts({
        title: req.body.title,
        desc: req.body.desc,
        userid: req.user._id
    })

    let post = await newPost.save()
    post = post._id

    let currUser = await user.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { posts: post } }
    )
    //console.log(currUser);

    res.json({
        success: "Post Added",
    })
}

exports.getUserPost = async (req, res) => {
    // returns post of a user

    let currUser = await user.findOne({ userName: req.params.id }).populate('posts')
    if (!currUser) {
        res.json({
            err: "User dosent exist"
        })
        return
    }

    res.json({
        success: "Success",
        data: currUser.posts
    })
}

exports.getPost = async (req, res) => {
    //console.log(req.params);
    let page = req.params.page

    if (isNaN(page)) {
        res.json({
            err: "Not a page no"
        })
        return
    }
    page = parseInt(page)

    let currPosts = await posts
        .find()
        .sort({ 'date': -1 })
        .limit(10)
        .skip(10 * page)
        .populate('userid', 'userName')
    // //console.log(currPosts);

    res.json({
        success: "Success",
        data: currPosts
    })
}

exports.getSinglePost = async (req, res) => {
    let id = req.params.id

    //checks if a object id is valid
    let isValid = scripts.isValidObjectId(id)
    if (!isValid) {
        res.json({
            err: "Invalid id"
        })
        return
    }

    // //console.log(await comment.findById('60fc322da13fef373c523c07').populate('user'));

    // let currPost = await posts.findById(id).populate({
    //     path: 'userid'
    // })

    let currPost = posts.findById(id).populate('userid', 'userName')
    currPost.populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'userName'
        }
    })
    currPost = await currPost

    //console.log(currPost)
    //console.log("Update")

    res.json({
        success: "Success",
        data: currPost
    })
}