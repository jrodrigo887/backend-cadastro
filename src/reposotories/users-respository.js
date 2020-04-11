const Connection = require('../database/connectio')
const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.get = async () => {
	var res = {};
	await Connection('users')
		.select('*')
		.then((value) => {
			res = value
		})
		.catch((e) => {
			console.error(e)
			return null
		})
		.finally(() => { Connection.destroy() })
	return res

}

exports.getById = async (id) => {
	var res = {}
	console.log(id)
	await Connection('teacher')
		.where('id', id)
		.select('full_name', 'email')
		.then((value) => {
			res = value

		})
		.catch((e) => {

			return e
		})
		.finally(() => {
			Connection.destroy()
		})

	return res
}


exports.create = async (data) => {
	console.log(data)
	const { cpf, cell, email, name, user, date, password } = data

	await bcrypt.hash(password, process.env.SALT_HASH, function (error, password) {

		if (!error) {

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

	})

	// await Connection('users')
	// .insert()
}

exports.update = (id, data) => {

}

exports.delete = (id) => {

}
