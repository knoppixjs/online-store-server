const ApiError = require('../services/ApiError');
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const { token } = req.cookies;
        if (!token) {
            return next(ApiError.forbidden('Не авторизован'))
        }
        req.user = jwt.decode(token)
        next()
    } catch (e) {
        return next(ApiError.forbidden('Не авторизован'))
    }
};
