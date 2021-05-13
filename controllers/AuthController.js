const ApiError = require('../services/ApiError');
const bcrypt = require('bcrypt')
const User = require('../models/UserModel')
const JwtApi = require("../services/JwtApi");
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

            const token = JwtApi.encode(user._id)
            res.cookie('X-AUTH-TOKEN', token, {httpOnly: true, maxAge: 24 * 3600});

            return res.json({id: user._id, email, name})
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

            const token = JwtApi.encode(user._id)
            res.cookie('X-AUTH-TOKEN', token, {httpOnly: true, maxAge: 24 * 3600});

            return res.json({id: user._id, email, name: user.name})
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async logout(req, res, next) {
        try {
            res.cookie('X-AUTH-TOKEN', '', {httpOnly: true, maxAge: 0});
            return res.json()
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getUser(req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.internal('Пользователь не найден'))
            }

            const {id} = req.user
            const user = await User.findOne({_id: id}, 'email name')

            res.cookie('XSRF-TOKEN', req.csrfToken());

            return res.json({...user})
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }
}

module.exports = new AuthController()
