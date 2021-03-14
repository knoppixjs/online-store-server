const ApiError = require('../services/ApiError');
const Product = require('../models/ProductModel')


class ProductController {
    async getById(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findOne({_id: id}).populate('category')

            if (!product) {
                return next(ApiError.internal('Продукт не найден'))
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getAll(req, res, next) {
        try {
            const products = await Product.find({}).populate('category')
            return res.json(products)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async create(req, res, next) {
        try {
            const {name, description, price, category} = req.body

            const product = new Product({name, description, price, category})
            await product.save()
            return res.json(product)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async estimate(req, res, next) {
        try {
            const {id} = req.params
            const {rating} = req.body

            const product = await Product.findOneAndUpdate({_id: id}, {rating})
            return res.json(product)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }


}

module.exports = new ProductController()
