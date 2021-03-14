const Router = require('express')
const router = new Router()
const userRouter = require('./UserRouter')
const authRouter = require('./AuthRouter')

router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router
