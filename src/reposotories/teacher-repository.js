const Connection = require('../database/connectio')

exports.get = async () => {
	var res = {}; 
	await Connection('teacher')
		.select('*')
		.then((value) => {
			res = value
		})
		.catch((e) => {
			console.error(e)
			return null
		})
		.finally(() => {Connection.destroy() })
	return res

}

exports.getById = async (id) => {


}

exports.create = async (data) => {
	console.log(data)

	// await Connection('users')
	// .insert()

}

exports.update = (id, data) => {

}

exports.delete = (id) => {

}
