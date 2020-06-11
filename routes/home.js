const Router = require('koa-router')
const { getTopic } = require('../controllers/article')
const router = new Router()

router.get('/', async (ctx) => {
    ctx.body = 'home'
})
router.get('/:id/topic', getTopic)

module.exports = router