const jwt = require('jsonwebtoken')

module.exports = {
	
	verifyToken(req, res, next) {
	  try {
		const token = req.headers.authorization.split(' ')[1]
		jwt.verify(token, 'longer-secret-is-better')
		next()
	  } catch (error) {
		res.status(401).json({ message: 'No token provided' })
	  }
	},


	generationToke(email, id, name) {

		let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
	}


} 
