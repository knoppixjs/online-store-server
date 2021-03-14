const Router = require('express')
const router = new Router()

const userRouter = require('./UserRouter')
const authRouter = require('./AuthRouter')
const productRouter = require('./ProductRouter')
const categoryRouter = require('./CategoryRouter')

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)

module.exports = router
