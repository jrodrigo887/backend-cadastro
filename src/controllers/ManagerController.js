const crypto = require('crypto')
const connection = require('../database/connectio')

module.exports = {
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
  }
}
