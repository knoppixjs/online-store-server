const ApiError = require('../services/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return next(ApiError.internal('Ошибка сервера'))
}
