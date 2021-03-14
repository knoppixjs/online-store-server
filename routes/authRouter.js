const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {check} = require("express-validator")

router.post('/registration', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], authController.registration)

router.post('/login', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен содержать минимум 6 символов').isLength({min: 6})
], authController.login)

module.exports = router
