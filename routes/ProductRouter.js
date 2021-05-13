const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/AuthMiddleware')
const productController = require('../controllers/ProductController')


router.get('/list', productController.getAll)
router.post('/create', productController.create)
router.put('/edit/:id', productController.update)
router.put('/estimate/:id', authMiddleware, productController.estimate)
router.get('/:id', productController.getById)

module.exports = router
