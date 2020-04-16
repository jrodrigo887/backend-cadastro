const connection = require('../database/connectio')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const user = 'users'

exports.get = async () => {
	var res = {};
	await connection('users')
		.select('*')
		.then((value) => {
			res = value
		})
		.catch((e) => {
			console.error(e)
			return null
		})
		.finally(() => { connection.destroy() })
	return res

}

exports.getById = async (id) => {
	var res = {}
	console.log(id)
	await connection('users')
		.where('id', id)
		.select('id', 'name', 'email', 'type')
		.first()
		.then((value) => {
			res = value

		})
		.catch((e) => {

			return e
		})
		.finally(() => {
			connection.destroy()
		})

	return res
}


exports.create = async (data) => {
	// const { cpf, cell, email, name, user, date, password } = data
	console.log("POST" + data)
	bcrypt.hash(data.password, parseInt(process.env.HASH_SALT))
		.then((e) => {
			connection('users')
				.insert({
					cpf: data.cpf,
					cell: data.cell,
					email: data.email,
					name: data.name,
					type: data.type,
					password: e,
					date: data.date
				})
				.then((data) => {
					console.log(data)
					return true
				})
				.catch((e) => {
					console.error(e)
					return false
				})
				.finally(() => { connection.destroy() })
		})
}

// -------- UPDTATE -----------
exports.update = (id, data) => {
	const { name, type, email } = data
	return connection('users')
		.where('id', id)
		.update({
			name,
			type,
			email
		})
		.then((value) => {
			return value
		})
		.finally(() => {
			connection.destroy()
		})
}

// -------- DELETE ----------
exports.delete = (id) => {

	return connection(user)
		.where('id', id)
		.first()
		.del()
		.then((value) => {
			return value
		})
		.catch((e) => {
			return e
		})
		.finally(() => {
			connection.destroy()
		})

}

// -------- validar o login do usuário -------
exports.auth = async (password, email) => {
	var result = false
	var data = {}

	await connection('users')
		.where('email', email)
		.select('*')
		.then((value) => {
			data = value[0]

			return bcrypt.compare(password, data.password)
				.then((vl) => {
					result = vl;
					console.log('Data: ' + data)
				})
		})
		.catch((e) => {
			return console.error(e)
		})
		.finally(() => {
			connection.destroy()
		})


	if (result == false) {
		return { result, data: null }
	}

	return { result, data }
}
