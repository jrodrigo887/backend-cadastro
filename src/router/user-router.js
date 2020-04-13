const express = require('express')
const router = express.Router()
const controller = require('../controllers/user-controller')
const authService = require('../services/auth-service')
// const validate = require('../validations/validator-data')
const { check } = require('express-validator')

router.get('/', controller.get)
router.get('/:id', controller.getById)

router.post('/', [
	check('name')
		.not()
		.isEmpty()
		.isLength({ min: 3 })
		.withMessage('Name must be atleast 3 characters long'),
	check('email', 'Email is required')
		.not()
		.isEmpty()
		.isEmail(),
	check('password', 'Password should be between 5 to 8 characters long')
		.not()
		.isEmpty()
		.isLength({ min: 5, max: 8 }),
		check('type', 'It is necessary to inform the type of user')
		.not()
		.isEmpty()
		.isLength({ min: 2, max: 15 })	
], controller.post)

router.post('/authenticate', controller.authenticate)
router.put('/:id', controller.put)
router.delete('/', controller.delete)

module.exports = router
