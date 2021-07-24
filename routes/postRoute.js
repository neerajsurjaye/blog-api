const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const authController = require('../controller/authController')


router.get('/', (req, res) => {
    res.json({
        post: 'post'
    })
})

router.post('/', authController.isAuth, postsController.addPost)

module.exports = router