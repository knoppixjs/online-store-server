const Router = require('express')
const router = new Router()
const AuthMiddleware = require('../middleware/AuthMiddleware')
const commentController = require('../controllers/commentController')


router.post('/create/:id', AuthMiddleware, commentController.create)
router.get('/list/:id', commentController.getAll)

module.exports = router
