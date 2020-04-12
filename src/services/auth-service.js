const jwt = require('jsonwebtoken')

exports.generationToken = async (data) => {
	return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1d' })
}

exports.decodeToken = async (token) => {

	var data = await jwt.verify(token, process.env.SECRET_KEY)
	return data
}

exports.authorize = function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access=token'];

	if (!token) {
		res.status(401).json({
			success: false, message: 'Access Restrict'
		})
	} else {
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (err) {
				res.status(401).json({
					success: false, 
					message: 'Token Invalid'
				})
			} else {
				next()
			}
		})
	}
}

exports.isAdmin = function (req, body, next) {
	var token = req.body.token || req.query.token || req.headers['x-access=token'];


	if (!token) {
		res.status(401).json({
			success: false, 
			message: 'Access Restrict'
		})
	} else {
		jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
			if (err) {
				res.status(401).json({
					success: false, 
					message: 'Token Invalid'
				})
			} else {

				if(decoded){

					// verificar o tipo de usuário.
					console.log(decoded)

					//passar para o próximo
					// next()
				}else{
					res.status(401).json({
						success: false, 
						message: 'Restrict to Administrator'
					})
				}
			}
		})
	}



}


