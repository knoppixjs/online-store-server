const {model, Schema, ObjectId} = require('mongoose')

const CommentSchema = new Schema({
    description: {type: String, required: true},
    user: {type: ObjectId, ref: 'User'},
    product: {type: ObjectId, ref: 'Product'}
})

module.exports = model('Comment', CommentSchema)
