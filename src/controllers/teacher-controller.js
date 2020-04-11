const respositories = require('../reposotories/teacher-repository')


exports.get = async (req, res, next) => {

	try {
		const data = await repositorie.get();
		res.status(200).json(data)

	} catch (error) {
		res.status(500).send({
			success: false, message: 'Request Failed'
		})
	}
}

exports.getById = async (req, res, next) => {

}

exports.post = async (req, res, next) => {

}

exports.put = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}