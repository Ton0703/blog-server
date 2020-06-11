const Router = require('koa-router')
const router = new Router({prefix: '/:articleId/:commentId'})
const {secret} = require('../config')
const jwt = require('koa-jwt')
const auth = jwt({secret})
const { create } = require('../controllers/reply')

router.post('/', auth, create)

module.exports = router