const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {
    secret
} = require('../config')

class UserCtl {
    async login(ctx) {
        const {
            name,
            password
        } = ctx.request.body
        const user = await User.findOne({
            name,
            password
        })
        if (!user) {
            ctx.throw(401, '用户名或者密码不正确')
        }
        const {
            _id
        } = user
        const token = jwt.sign({
            _id,
            name
        }, secret, {
            expiresIn: '1d'
        })
        ctx.body = token
    }
    async register(ctx) {
        const {
            name
        } = ctx.request.body
        const user = await User.findOne({
            name
        })
        if (user) {
            ctx.throw(409, '用户名已经存在')
        }
        const newUser = await new User(ctx.request.body).save()
        const {
            _id
        } = newUser
        const token = jwt.sign({
            name,
            _id
        }, secret, {
            expiresIn: '1d'
        })
        ctx.body = token
    }
}

module.exports = new UserCtl()