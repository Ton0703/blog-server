const mongoose = require('mongoose')
const {
    model,
    Schema
} = mongoose

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    articleId: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Comment', commentSchema)