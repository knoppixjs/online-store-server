const {model, Schema} = require('mongoose')

const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true},
})

module.exports = model('Category', CategorySchema)
