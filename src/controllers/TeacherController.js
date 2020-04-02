const crypto = require('crypto');
const connection = require('../database/connectio');

module.exports = {
	async create(req, res) {

		const { registration, cpf, cell, email, full_name, school, city, confirmed, type } = req.body;
		const id_manager = req.headers.authorization;

		let data = await connection('teacher').insert({
			registration,
			cpf,
			cell,
			email,
			full_name,
			school,
			city,
			confirmed,
			type,
		}).then(function(valor){
			return console.log("Valores", valor);
		}).catch(function(valor){
			return console.log("Valor errado", + valor);
		});

		return res.status(204).json({msg: "Valor inserido", valor});

	},

	async index(req, res) {
		const { page = 1} = req.query;

		const [count] = await connection('teacher').count();
		console.log(count);

		const teachers = await connection('teacher')
		.limit(5)
		.offset((page - 1) * 5)
		.select('*');
		res.header('x-total-count', count['count(*)']);

		res.json(teachers);

	},

	// async update(req, res){
	// 	//posso compara o id ou matrícula do usuário para validar
	// 	const { id } = req.params;


	// 	const teacher = await connection('teacher')
	// 		.where('id', id)



	// },

	async remove(req, res) {
		isUser = false;
		//para deletar um usuário(professor) só ocorrera com permissão
		//do admin ou gerenciador. 
		const id_manager = req.headers.authorization;
		const id = req.params;

		//confirmar o usuário. preciso fazer um tratamento de erro aqui, 
		//caso o usuário não tenha autorização
		const data = await connection('manager')
			.where('id', id_manager)
			.select('user')
			.first()
			.then(function(e){
				return console.log("Erro", e);
			})

		if (data.user != "jrodrigo") {
			return res.status(401).json({ error: "Usuário não tem permissão para deletar o registro" })
			console.log("Não reconhece o usuário!");
		} else {

			await connection('teacher')
				.where('id', id)
				.delete()

			return res.status(204).send();
			// this.isUser = false;
			console.log('Deletado!');
		}


	}


}





