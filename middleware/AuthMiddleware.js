const ApiError = require('../services/ApiError');
const config = require("config")
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.internal('Не авторизован'))
        }
        req.user = jwt.verify(token, config.get("secretKey"))
        next()
    } catch (e) {
        return next(ApiError.internal('Не авторизован'))
    }
};
