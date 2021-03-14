const Router = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()
const userController = require('../controllers/userController')


router.get('/:id', userController.getById)
router.get('/', authMiddleware, userController.getAll)

module.exports = router
