const Router = require('express')
const authMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()
const userController = require('../controllers/UserController')


router.get('/:id', userController.getById)
router.get('/', authMiddleware, userController.getAll)

module.exports = router
