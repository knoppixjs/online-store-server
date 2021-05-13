const ApiError = require('../services/ApiError');
const JwtApi = require("../services/JwtApi");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.cookies['X-AUTH-TOKEN'];
        if (!token) {
            return next(ApiError.forbidden('Не авторизован'))
        }
        req.user = JwtApi.decode(token)
        next()
    } catch (e) {
        return next(ApiError.forbidden('Не авторизован'))
    }
};
