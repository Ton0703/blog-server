const Router = require('koa-router')
const router = new Router({prefix: '/article'})
const {find, create, findOne, getTopic, delete: del, findRandom, findAdmin, update } = require('../controllers/article')

router.get('/', find)
router.get('/admin', findAdmin)
router.get('/random', findRandom)
router.post('/', create)
router.get('/:id', findOne)
router.put('/:id', update)
router.get('/topic/:topic', getTopic)
router.delete('/:id', del)


module.exports = router