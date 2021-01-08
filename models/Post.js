const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    creatorId: {
        type: String,
        trim: true,
        required: 'Creator id required'
    },
    postSections: {
        type: Array,
        required: 'Sections array required'
    }
})

const Post = mongoose.model('Post', schema)

module.exports = Post;