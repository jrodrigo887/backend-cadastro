const { check, validationResult } = require('express-validator') 

exports.valid = async (req) => {
	return [
		check(req.body.name)
			.not()
			.isEmpty()
			.isLength({ min: 3 })
			.withMessage('Name must be atleast 3 characters long'),
		check(req.body.email, 'Email is required')
			.not()
			.isEmpty(),
		check(req.body.password, 'Password should be between 5 to 8 characters long')
			.not()
			.isEmpty()
			.isLength({ min: 5, max: 8 })
	]
}

exports.validateData = function(req, res, next) {	

	const result = validationResult(req)

	console.log(req.body)
	console.log(result.isEmpty() )

	if (!result.isEmpty() ) {
		next()
	} else {
		res.status(403).send({
			success: false,
			message: 'Dados Inválidos'
		})
	}



}
