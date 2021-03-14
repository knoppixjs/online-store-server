const {model, Schema} = require('mongoose')

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
})

module.exports = model('User', User)
