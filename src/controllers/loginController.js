const connection = require('../database/connectio')

module.exports = {
  async signin (req, res) {
    const { email, name, password, repeatPassword } = req.body
    if (password === repeatPassword) {
      const user = await connection('users')
        .insert({
          name,
          email,
          password
        })
      return res.json(user)
    }
    res.status(401).json({ error: 'password must be equal to repeat passsword' })
  }
}
