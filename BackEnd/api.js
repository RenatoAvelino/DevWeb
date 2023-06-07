const express= require('express')
const db = require('./db')
const app = express()
const porta = process.env.PORT

const account_controller = require('./controllers/account-controller')
const customerUser_controller = require('./controllers/customerUser-controller')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
account_controller(app)
customerUser_controller(app)

app.get('/',(req,res)=>{
  res.status(200).send('Ola Mundo Express!')
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
