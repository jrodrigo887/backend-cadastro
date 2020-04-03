// const crypto = require('crypto')
const connection = require('../database/connectio')

module.exports = {
  async create (req, res) {
    const { registration, cpf, cell, email, name, school, city, confirmed, type } = req.body
    // const id_manager = req.headers.authorization

    const data = await connection('teacher').insert({
      registration,
      cpf,
      cell,
      email,
      name,
      school,
      city,
      confirmed,
      type
    })
    return res.status(204).json({ msg: 'Valor inserido', data })
  },

  async index (req, res) {
    const { page = 1 } = req.query

    const [count] = await connection('teacher').count()
    console.log(count)

    const teachers = await connection('teacher')
      .limit(5)
      .offset((page - 1) * 5)
      .select('*')
    res.header('x-total-count', count['count(*)'])

    res.json(teachers)
  },

  async remove (req, res) {
    // para deletar um usuário(professor) só ocorrera com permissão
    // do admin ou gerenciador.
    const idManager = req.headers.authorization
    const id = req.params

    // confirmar o usuário. preciso fazer um tratamento de erro aqui,
    // caso o usuário não tenha autorização
    const data = await connection('manager')
      .where('id', idManager)
      .select('user')
      .first()
      .then(function (e) {
        return console.log('Erro', e)
      })

    if (data.user !== 'jrodrigo') {
      return res.status(401).json({ error: 'Usuário não tem permissão para deletar o registro' })
    } else {
      await connection('teacher')
        .where('id', id)
        .delete()

      return res.status(204).send()
    }
  }

}
