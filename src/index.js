const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://meuap.com.br'
}))
app.use(express.json())
app.use(routes)

app.listen(3333, () => {
  console.log('Servidor Ativo!')
})
