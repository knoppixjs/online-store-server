const ApiError = require('../services/ApiError');
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const JwtGenerator = require("../services/JwtGenerator");
const {validationResult} = require("express-validator");


class AuthController {
    async registration(req, res, next) {
        try {
            const validation = validationResult(req)
            if (!validation.isEmpty()) {
                return next(ApiError.badRequest(validation.errors.map(({msg}) => msg)))
            }

            const {name, email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 6)
            const user = new User({email, password: hashPassword, name})
            await user.save()

            const token = JwtGenerator.generate(user._id, user.email)
            res.cookie('token', token, {httpOnly: true});
            return res.json({token})
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async login(req, res, next) {
        try {
            const validation = validationResult(req)

            if (!validation.isEmpty()) {
                return next(ApiError.badRequest(validation.errors.map(({msg}) => msg)))
            }

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Указан неверный пароль'))
            }

            const token = JwtGenerator.generate(user._id, user.email)
            res.cookie('token', token, {httpOnly: true});

            return res.json({email: user.email, name: user.name})
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie('token', '', {maxAge: 0});
            return res.json()
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }
}

module.exports = new AuthController()
