const Router = require('express')
const router = new Router()

const authRouter = require('./AuthRouter')
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')
const commentRouter = require('./CommentRouter')
const brandRouter = require('./BrandRouter')

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/comment', commentRouter)
router.use('/brand', brandRouter)

module.exports = router
