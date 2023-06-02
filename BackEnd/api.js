const express= require('express')
const db = require('./db')
const app = express()
const porta = process.env.PORT

const Account = require('./Models/account')


app.get('/',(req,res)=>{
	res.status(200).send('Ola Mundo Express!')
})

class Populate {
  static async popularDados() {
    try {
      // Lógica para popular os dados no banco de dados
      await db.sync({ force: true }) // Recria as tabelas (opcional)
      await Account.create({ login: 'Vini', password: '1234', category:'Admin'})
      await Account.create({ login: 'Jonathan', password: 'Dio', category:'Customer'})
      await Account.create({ login: 'Joseph', password: 'Brando', category:'Company'})
      return true
    } catch (error) {
      console.error(`Erro ao popular dados: ${error.message}`)
    }
  }
}

app.get('/populardados', async (req, res) => {
  try {
    let popular = await Populate.popularDados()
    if(popular=true){
      res.status(200).send('Dados populados com sucesso')
    } else{
      res.status(500).send(`Erro ao popular dados: ${error.message}`)
    }
  } catch (error) {
    res.status(500).send(`Erro ao popular dados: ${error.message}`)
  }
})

app.listen(porta || 3000, async () => {
  try {
    await db.sync() // Sincroniza o banco de dados
    console.log('Banco de dados sincronizado');
    console.log(`Servidor rodando em http://localhost:${porta || 3000}`)
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error)
  }
})
