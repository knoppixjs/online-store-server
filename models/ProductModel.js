const {model, Schema, ObjectId} = require('mongoose')

const ProductSchema = new Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    img: {type: String, unique: true},
    rates: [
        {
            rate: {type: Number, default: 0},
            user: {type: ObjectId, ref: 'User'}
        },
    ],
    category: {type: ObjectId, ref: 'Category', required: true},
    brand: {type: ObjectId, ref: 'Brand', required: true}
})

module.exports = model('Product', ProductSchema)
