const Router = require('koa-router')
const router = new Router()
const { login, register } = require('../controllers/user')

router.post('/login', login)
router.post('/register', register)

module.exports = router