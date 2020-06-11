const mongoose = require('mongoose')
const {
    model,
    Schema
} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema)