const connection = require('../database/connectio')

module.exports = {

	async index(req, res) {
		// selecionar o tipo de professor (efetivo ou prestador)
		const teachers = await connection('teacher')
			.select('*')
		res.json(teachers)

	},

	async create (req, res) {
		const { cpf, cell, email, name, user, value } = req.body
		// create id crypto
		const id = crypto.randomBytes(4).toString('HEX')
	
		const data = await connection('manager').insert({
		  id,
		  cpf,
		  cell,
		  email,
		  name,
		  user,
		  value
		})
	
		console.log('Dados Salvo' + data)
		return res.json({ name, email })
	  },
	
	  async index (req, res) {
		const teachers = await connection('manager').select('*')
	
		res.json(teachers)
	  },


	  async createAty (req, res) {
		// const { id } = req.body
		const idManager = req.headers.authorization
	
		const data = await connection('manager')
		  .where('id', idManager)
		  .select('email', 'full_name')
		  .first()
	
		if (!data) {
		  return res.status(400).json({ error: 'Login não autorizado!' })
		}
	
		return res.json(data)
	  }


}
