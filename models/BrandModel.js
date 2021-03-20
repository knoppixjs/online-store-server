const {model, Schema} = require('mongoose')

const BrandSchema = new Schema({
    name: {type: String, required: true, unique: true},
})

module.exports = model('Brand', BrandSchema)
