const mongoose = require('mongoose')
const {
    model,
    Schema
} = mongoose

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String
    }],
    topic: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Article', ArticleSchema)