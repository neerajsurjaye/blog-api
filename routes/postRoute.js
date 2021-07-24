const express = require('express')
const router = express.Router()
const postsController = require('../controller/postsController')
const authController = require('../controller/authController')


router.get('/', postsController.getPost)
router.post('/', authController.isAuth, postsController.addPost)
router.get('/:id', postsController.getSinglePost)
router.get('/user/:id', postsController.getUserPost)

module.exports = router