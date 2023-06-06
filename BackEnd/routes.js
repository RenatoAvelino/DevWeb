const db = require('./db')
const Account = require('./Models/account')

module.exports = function(app) {
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
    
  }