const ApiError = require('../services/ApiError');
const jwt = require('jsonwebtoken')
const JwtGenerator = require("../services/JwtGenerator");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ApiError.forbidden('Не авторизован'))
        }
        req.user = jwt.verify(token, JwtGenerator.key)
        next()
    } catch (e) {
        return next(ApiError.forbidden('Не авторизован'))
    }
};
