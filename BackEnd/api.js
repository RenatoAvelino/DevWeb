const express= require('express')
const db = require('./db')
const app = express()
const porta = process.env.PORT

const account_controller = require('./controllers/account-controller')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
account_controller(app)

app.get('/',(req,res)=>{
  res.status(200).send('Ola Mundo Express!')
})

app.get('/test', async (req, res) => {
try {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Substitua com a origem correta
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  let valores = {
    Nome: "Vinícius Rebouças Cortêz",
    telefone: Math.round(Math.random() * 1000000000),
    cpf: Math.round(Math.random() * 1000000000)
  }
  res.status(200).json(valores)
}
catch(error) {
  res.status(500).send(`Erro ao carregar vindo do back: ${error.message}`)
}
})

app.listen(porta || 8000, async () => {
  try {
    await db.sync() // Sincroniza o banco de dados
    console.log('Banco de dados sincronizado');
    console.log(`Servidor rodando em http://localhost:${porta || 8000}`)
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error)
  }
})
