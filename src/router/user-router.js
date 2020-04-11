const express = require('express')
const router = express.Router()
const controller = require('../controllers/user-controller')
const authService = require('../services/auth-service')

router.get('/', controller.get)
router.get('/:id', controller.getById)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/', controller.delete)

module.exports = router