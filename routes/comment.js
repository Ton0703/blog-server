const Router = require('koa-router')
const router = new Router({prefix: '/comment'})
const jwt = require('koa-jwt')
const { secret } = require('../config')
const {create, getComment, delete: del} = require('../controllers/comment')
const {checkArticleExist} = require('../controllers/article')

const auth = jwt({secret})

router.post('/:articleId', checkArticleExist, auth, create)
router.get('/:articleId', getComment)
router.delete('/:id',auth, del )

module.exports = router