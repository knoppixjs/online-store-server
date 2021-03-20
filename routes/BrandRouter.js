const Router = require('express')
const router = new Router()
const brandController = require('../controllers/BrandController')


router.get('/list',  brandController.getAll)
router.post('/create',  brandController.create)
router.get('/:id', brandController.getById)

module.exports = router
