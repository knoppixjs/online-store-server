const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const authRouter = require('./authRouter')

router.use('/auth', authRouter)
router.use('/users', userRouter)

module.exports = router
