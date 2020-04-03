const connection = require('../database/connectio')

module.exports = {

  async index (req, res) {
    const { type } = req.body
    // selecionar o tipo de professor (efetivo ou prestador)
    const teachers = await connection('teacher')
      .where('type', type)
      .select('*')
    res.json(teachers)
  }
}
