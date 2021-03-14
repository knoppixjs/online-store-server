const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')


router.get('/list', userController.getAll)
router.get('/:id', userController.getById)

module.exports = router
