const CustomerContract = require('../models/customerContract')
const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('../middlewares')

const customerContractFields = ['id', 'startDate', 'endDate']

module.exports = function(app) {
  app.get('/customerContract-by-id/:id', verifyJWT, authenticate, async (req, res) => {
    const { id } = req.params

    try {
      const customerContract = await CustomerContract.findByPk(id, {
        attributes: customerContractFields
      })
      if (!customerContract) {
        res.status(404).send('Informações do usuario não encontradas')
        return
      }
      res.status(200).send(customerContract)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar as informações do usuario: ${error.message}`)
    }
  })
}