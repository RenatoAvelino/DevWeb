const { DATE } = require('sequelize')
const db = require('../db')
const CustomerUser = require('../models/customerUser')

module.exports = function(app) {
  app.get('/custumerUser-by-id/:id', async (req, res) => {
    const { id } = req.params

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Substitua com a origem correta
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
      const customerUser = await CustomerUser.findByPk(id)
      if (!customerUser) {
        res.status(404).send('Informações do usuario não encontradas')
        return
      }
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar as informações do usuario: ${error.message}`)
    }
  })
}