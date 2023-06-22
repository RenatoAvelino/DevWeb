const CustomerUser = require('../models/customerUser')
const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('../middlewares')

const customerUserFields = ['id', 'login', 'category']

module.exports = function(app) {
  app.get('/customerUser-by-id/:id', verifyJWT, authenticate, async (req, res) => {
    const { id } = req.params

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