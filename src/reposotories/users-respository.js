const connection = require('../database/connectio')
const User = require('../models/User')
const bcrypt = require('bcrypt')


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
	await connection('teacher')
		.where('id', id)
		.select('full_name', 'email')
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

exports.update = (id, data) => {

	return connection('users').insert({
		cpf,
		cell,
		email,
		name,
		user,
		password,
		date
	})

}

exports.delete = (id) => {

}

// validar o login do usuário
exports.auth = async (password, email) => {
	var result = false;

	await connection('users')
		.where('email', email)
		.select('name', 'email', 'password')
		.then((value) => {
			const data = value[0]

			return result = bcrypt.compare(password, data.password )

		})
	//entrar na conta do usuário e comparar a senha. 
	console.log("Teste " + result)

	return result;
}
