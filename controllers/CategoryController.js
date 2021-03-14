const ApiError = require('../services/ApiError');
const Category = require('../models/CategoryModel')


class CategoryController {
    async getById(req, res, next) {
        try {
            const {id} = req.params
            const category = await Category.findOne({_id: id})
            if (!category) {
                return next(ApiError.internal('Продукт не найден'))
            }
            return res.json(category)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.find()
            return res.json(categories)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async create(req, res, next) {
        try {
            const {name} = req.body

            const category = new Category({name})
            await category.save()
            return res.json(category)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

}

module.exports = new CategoryController()
