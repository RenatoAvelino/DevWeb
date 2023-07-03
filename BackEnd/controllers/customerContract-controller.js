const CustomerContract = require('../models/customerContract')
const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('../middlewares')

const customerContractFields = ['id', 'startDate', 'endDate','CustomerUserId']

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

  app.get('/get-all-customersContracts', verifyJWT, authorizeCompany, async (req, res) =>{
    try {
      const customerContract = await CustomerContract.findAll({
        attributes: customerContractFields
      })
      res.status(200).send(customerContract)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
    }
  })

  app.post('/contract-create/:id', verifyJWT, authorizeCompany, async (req, res) => {
    const body = req.body
    const { id } = req.params
    if(body.contractPath){
      var contractPath = body.contractPath
    } else{
      var contractPath = null
    }

    try {
      const customerContract = await CustomerContract.create({ 
        startDate: body.startDate,
        endDate: body.endDate,
        contractPath: contractPath,
        CustomerUserId: id
      })
      res.status(200).json(customerContract)
    } catch (error) {
      res.status(500).send(`Erro ao criar contrato: ${error.message}`)
    }
  })
}