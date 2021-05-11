const ApiError = require('../services/ApiError');
const User = require('../models/UserModel')


class UserController {
    async getById(req, res, next) {
        try {
            if (!req.user) {
                return next(ApiError.internal('Пользователь не найден'))
            }
            const {id} = req.user
            const user = await User.findOne({_id: id}, 'email name')

            return res.json(user)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await User.find({}, 'email name')
            return res.json(users)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

}

module.exports = new UserController()
