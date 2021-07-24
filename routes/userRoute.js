const express = require('express')
const router = express.Router()

const userController = require('../controller/userController')
const authController = require('../controller/authController')

router.get('/:id', userController.getUser)
router.get('/', authController.isAuth, userController.getCurrentUser)


module.exports = router