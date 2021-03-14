const {model, Schema, ObjectId} = require('mongoose')

const ProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, unique: true},
    rating: {type: Number, default: 0},
    category: {type: ObjectId, ref: 'Category'}
})

module.exports = model('Product', ProductSchema)
