const express= require('express')
const db = require('./db')
const app = express()
const porta = process.env.PORT

const routes = require('./routes');
routes(app);

app.listen(porta || 8000, async () => {
  try {
    await db.sync() // Sincroniza o banco de dados
    console.log('Banco de dados sincronizado');
    console.log(`Servidor rodando em http://localhost:${porta || 8000}`)
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error)
  }
})
