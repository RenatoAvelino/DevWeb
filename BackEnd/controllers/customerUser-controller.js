const CustomerUser = require('../models/customerUser')
const CustomerContract = require('../models/customerContract')
const Account = require('../models/account')
const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('../middlewares')

const customerUserFields = [
  `id`,`name`,`phone`,`cpf`,`birthday`,`address`,`email`,`bankAccount`,`gender`,`language`
]

module.exports = function(app) {
  app.get('/customerUser-by-id/:id', verifyJWT, authenticate, async (req, res) => {
    const { id } = req.params

    try {
      const customerUser = await CustomerUser.findByPk(id, {
        attributes: customerUserFields
      })
      if (!customerUser) {
        res.status(404).send('Informações do usuario não encontradas')
        return
      }
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar as informações do usuario: ${error.message}`)
    }
  })

  app.get('/get-all-customers', verifyJWT, authorizeCompany, async (req, res) =>{
    try {
      const customerUser = await CustomerUser.findAll({
        attributes: customerUserFields
      })
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
    }
  })

  app.post('/customerUser-create', verifyJWT, authorizeCompany, async (req, res) => {
    const body = req.body

    if(body.birthday){
      var birthday = body.birthday
    } else{
      var birthday = null
    }
    if(body.gender){
      var gender = body.gender
    } else{
      var gender = null
    }
    if(body.language){
      var language = body.language
    } else{
      var language = null
    }

    try {
      const customerUser = await CustomerUser.create({ 
        name:body.name,
        phone:body.phone,
        cpf:body.cpf,
        birthday:birthday,
        address:body.address,
        email:body.email,
        bankAccount:body.bankAccount,
        gender:gender,
        language:language
      })
      res.status(200).json(customerUser)
    } catch (error) {
      res.status(500).send(`Erro ao criar cliente: ${error.message}`)
    }
  })

  app.patch('/customerUser-update/:id', verifyJWT, authenticate, async (req, res) => {
    const body = req.body
    const { id } = req.params
    const category = req.user.category

    try {
      var customerUser = await CustomerUser.findByPk(id, {
        attributes: customerUserFields
      })
      if (!customerUser) {
        res.status(404).send('Usuário não encontrada')
        return
      }
      
      //Campos Alteraveis
      if (body.name) {
        customerUser.name = body.name
      }
      if (body.phone) {
        customerUser.phone = body.phone
      }
      if (body.cpf) {
        customerUser.cpf = body.cpf
      }
      if (body.birthday) {
        customerUser.birthday = body.birthday
      }
      if (body.address) {
        customerUser.address = body.address
      }
      if (body.email) {
        customerUser.email = body.email
      }
      if (body.bankAccount) {
        customerUser.bankAccount = body.bankAccount
      }
      if (body.gender) {
        customerUser.gender = body.gender
      }
      if (body.language) {
        customerUser.language = body.language
      }

      await customerUser.save()
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possível atualizar o usuário: ${error.message}`)
    }

    
  })

  app.delete('/customerUser-delete/:id', verifyJWT, authenticate, async (req, res) => {
    const { id } = req.params
    const category = req.user.category
    
    try {
    let customerUser = await CustomerUser.findByPk(id, {
      attributes: customerUserFields
    })
    let customerContract = await CustomerContract.findOne({
      where: {
        CustomerUserId: id
      }
    })
    let account = await Account.findOne({
      where: {
        CustomerUserId: id
      }
    })
    if (!customerUser) {
      res.status(404).send('Conta não encontrada')
      return
    }

    await customerUser.destroy()
    await customerContract.destroy()
    await account.destroy()
    res.status(200).send(customerUser)
  } catch (error) {
    res.status(500).send(`Não foi possível apagar a conta: ${error.message}`)
  }
  })
}