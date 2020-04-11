const repositorie = require('../reposotories/users-respository')
const User = require('../models/User')


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
	const { id } = req.params

	try {

		const data = await repositorie.getById(id)
		res.status(200).send(data)

	} catch (e) {
		res.status(500).send({
			success: false, message: 'Your request failed'
		})
	}

}

exports.post = async (req, res, next) => {
	const {	cpf,cell,email,	name,user,password,	date} = req.body

	const addUse = new User(cpf,cell,email,name,user,password,date)
	try {
		await repositorie.put(addUse)
		res.status(200).send({
			success: true,
			message: 'Saved successfully'
		})
		
	}catch(e){
		res.status(500).send({
			success: false,
			message: 'Data not saved'
		})
	}


}

exports.put = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}