const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email required'
    },
    password: {
        type: String,
        trim: true,
        required: 'Password required'
    }
})

const User = mongoose.model('User', schema)

module.exports = User;