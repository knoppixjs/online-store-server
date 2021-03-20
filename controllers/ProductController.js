const ApiError = require('../services/ApiError');
const Product = require('../models/ProductModel')


class ProductController {
    async getById(req, res, next) {
        try {
            const {id} = req.params
            const product = await Product.findById(id).populate('category').populate('brand')

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
            const products = await Product.find({}).populate('category').populate('brand')
            return res.json(products)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async create(req, res, next) {
        try {
            const {name, description, price, category, brand} = req.body
            const product = new Product({name, description, price, category, brand})
            await product.save()
            return res.json(product)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const data = req.body

            const product = await Product.findByIdAndUpdate(id, data, {new: true})
            return res.json(product)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async estimate(req, res, next) {
        try {
            const {id} = req.params
            const {rate} = req.body
            const user = req.user

            const product = await Product.findOne({_id: id, "rates.user": {$eq: user.id}})

            if (product) {
                return next(ApiError.internal('Нельзя голосовать больше одного раза'))
            }

            const updateProduct = await Product.findByIdAndUpdate(id, {
                $push: {
                    rates: {
                        user: user.id,
                        rate
                    }
                }
            }, {new: true})

            return res.json(updateProduct)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

}

module.exports = new ProductController()
