const express= require('express')
const conexao = require('./db')
const app = express()
const porta = process.env.PORT


app.get('/',(req,res)=>{
	res.send('Ola Mundo Express!')
})

app.get('/testar-conexao',async (req,res)=>{
    try {
        await conexao.conectar();
        res.send('Conectado ao banco');
      } catch (error) {
        res.send(`Erro ao conectar ao banco: ${error.message}`);
      }
})

app.listen(porta || 3000, ()=>console.log('servidor rodando em http://localhost:' + (porta || 3000)))