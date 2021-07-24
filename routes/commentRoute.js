const express = require('express')
const router = express.Router()
const auth = require('../controller/authController')

const commentController = require('../controller/commentsController')

router.post('/:postId', auth.isAuth, commentController.addComment)

module.exports = router