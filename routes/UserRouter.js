const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')


router.get('/:id', userController.getById)
router.get('/', userController.getAll)

module.exports = router
