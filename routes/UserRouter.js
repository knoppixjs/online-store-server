const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const AuthMiddleware = require('../middleware/AuthMiddleware')

router.get('/list', AuthMiddleware, userController.getAll)
router.get('/', AuthMiddleware, userController.getById)

module.exports = router
