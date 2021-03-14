const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/CategoryController')


router.get('/list',  categoryController.getAll)
router.post('/create',  categoryController.create)
router.get('/:id', categoryController.getById)

module.exports = router
