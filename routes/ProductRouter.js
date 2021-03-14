const Router = require('express')
const router = new Router()
const productController = require('../controllers/ProductController')


router.get('/list', productController.getAll)
router.post('/create', productController.create)
router.get('/:id', productController.getById)
router.put('/:id', productController.estimate)

module.exports = router
