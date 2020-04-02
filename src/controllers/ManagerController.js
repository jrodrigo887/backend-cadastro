const crypto = require('crypto');
const connection = require('../database/connectio');

module.exports = {
	async create(req, res){

		const {cpf,cell,email,full_name,user, value} = req.body;
		//criar id
		const id = crypto.randomBytes(4).toString('HEX');
	
		let data = await connection('manager').insert({
			id,
			cpf,
			cell,
			email,
			full_name,
			user,
			value
		});

		console.log("Dados Salvo" + data);
		return res.json({ full_name, email })

	},

	async index(req, res){

		const teachers = await connection('manager').select('*');
	
		res.json(teachers);

	}



}

