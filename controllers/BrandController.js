const ApiError = require('../services/ApiError');
const Brand = require('../models/BrandModel')


class BrandController {
    async getById(req, res, next) {
        try {
            const {id} = req.params
            const brand = await Brand.findById(id)
            if (!brand) {
                return next(ApiError.internal('Бренд не найден'))
            }
            return res.json(brand)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.find()

            return res.json(brands)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body

            const brand = new Brand({name})
            await brand.save()

            return res.json(brand)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

}

module.exports = new BrandController()
