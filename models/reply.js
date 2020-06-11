const mongoose = require('mongoose')
const {
    model,
    Schema
} = mongoose

const replySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true
    },
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    replyTo: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Reply', replySchema)