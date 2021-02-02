const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const schema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: 'Creator required'
    },
    title: {
        type: String,
        trim: true,
        required: 'Post title required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Post description required'
    },
    postSections: {
        type: Array,
        required: 'Sections array required'
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', schema)

module.exports = Post;