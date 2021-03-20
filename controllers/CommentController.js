const ApiError = require('../services/ApiError');
const Comment = require('../models/CommentModel')
const mongoose = require('mongoose')

class CommentController {
    async create(req, res, next) {
        try {
            const {id} = req.params
            const {description} = req.body
            const user = req.user

            const comment = new Comment({description, user: user.id, product: id})
            await comment.save()

            return res.json(comment)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

    async getAll(req, res, next) {
        try {
            const {id} = req.params

            const comments = await Comment.find({product: mongoose.Types.ObjectId(id)}).populate('user', 'name')
            console.log(comments)
            return res.json(comments)
        } catch (e) {
            next(ApiError.internal('Ошибка сервера'))
        }
    }

}

module.exports = new CommentController()
