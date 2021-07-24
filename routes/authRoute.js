const authController = require('../controller/authController')
const router = require('express').Router()

router.post('/sign-up', authController.signUp)
router.post('/log-in', authController.login)


module.exports = router