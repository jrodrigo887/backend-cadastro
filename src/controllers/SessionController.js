const connection = require('../database/connectio');

module.exports = {

	async create(req, res){
		const { id } = req.body;
		const id_manager = req.headers.authorization;

		const data = await connection('manager')
		.where('id', id_manager)
		.select('email', 'full_name')
		.first();

		if(!data){
			return res.status(400).json({ error: "Login não autorizado!"});
		}

		return res.json(data);
	}
}