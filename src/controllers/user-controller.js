const repositorie = require('../reposotories/users-respository')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const authService = require('../services/auth-service')

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


// create user
exports.post = async (req, res, next) => {
	const errors = validationResult(req)

	const { cpf, cell, email, name, type, password, date } = req.body
	const addUse = new User(cpf, cell, email, name, type, password, date)

	if (!errors.isEmpty()) {

		res.status(400).send({
			success: false,
			message: 'Error in data sent.'
		})

	}

	try {

		await repositorie.create(addUse)
		res.status(200).send({
			success: true,
			message: 'Saved successfully.'
		})

	} catch (e) {
		res.status(500).send({
			success: false,
			message: 'Data not saved.'
		})
	}

}

exports.put = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}

exports.authenticate = async (req, res, next ) =>{ 

	const { email, password } = req.body

	try{
		console.log(password)

		const res = await repositorie.auth(password, email)

		//comparado a senha e email, gerar token para o usuário
		if(!res){
			res.status(404).send({
				success: false,
				message: 'User or password invalid.'
			})
			return
		}

		const token = await authService.generationToken({
			// add data no token.


		})

		console.log("Resposta controll " + res)

	}catch(e){

		console.log(e)

	}
}