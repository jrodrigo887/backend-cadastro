const repository = require('../reposotories/users-respository')
const User = require('../models/User')
const { validationResult } = require('express-validator')
const authService = require('../services/auth-service')

exports.get = async (req, res, next) => {

	try {
		const data = await repository.get();
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
		const data = await repository.getById(id)
		res.status(200).send({
			success: true,
			data
		})

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

		await repository.create(addUse)
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

	try {
		var result = await repository.update(req.params.id, req.body)

		console.log(result)
		if (result) {
			res.status(200).send({
				success: true,
				message: 'User updtated successfully.'
			})
		}

	} catch (e) {
		console.error(e)
		res.status(500).send({
			success: false,
			message: 'Fail your request.'
		})

	}
}

exports.delete = async (req, res, next) => {
	const id = req.params.id
	
	try {
		var result = await repository.delete(id)

		console.log(result)

		res.status(404).send({
			success: true,
			message: 'Client deleted'
		})


	} catch (e) {
		console.error(e)

		res.status(404).send({
			success: false,
			message: 'Could not delete.'
		})

	}
}

exports.authenticate = async (req, res, next) => {

	const { email, password } = req.body

	try {

		const custom = await repository.auth(password, email)

		console.log("Resultado: " + JSON.stringify(custom.result))
		console.log("Dados: " + JSON.stringify(custom.data))
		//comparado a senha e email, gerar token para o usuário
		if (!custom.result) {
			res.status(404).send({
				success: false,
				message: 'Email or password invalid.'
			})
			return
		}

		const user = custom.data
		const token = await authService.generationToken({
			id: user.id,
			email: user.email,
			name: user.name,
			type: user.type
		})

		res.status(201).send({
			token: token,
			data: {
				email: user.email,
				name: user.name
			}
		})

	} catch (e) {

		res.status(500).send({
			success: false,
			message: 'Error processing your request'
		})

	}
}

exports.refreshToken = async (req, res, next) => {

	try {

		const token = req.body.token || req.query.token || req.headers['x-acess-token']
		const data = await authService.decodeToken(token)

		const custom = await repository.getById(data.id)

		if (!custom) {
			res.status(404).send({
				success: false,
				message: 'Client not found'
			})

			return
		}

		console.log(custom)

		const tokenData = await authService.generationToken({
			id: custom.id,
			email: custom.email,
			name: custom.name,
			type: custom.type

		})

		res.status(201).send({
			token: tokenData,
			data: {
				email: user.email,
				name: user.name
			}
		})

	} catch (e) {
		res.status(500).send({
			success: false,
			message: 'Fail your request'
		})
	}

}