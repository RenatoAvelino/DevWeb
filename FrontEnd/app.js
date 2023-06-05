const express = require('express')
const app = express()
const porta = process.env.PORT

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    //res.render('pages/base/NaoFeitoAinda')
    res.render('pages/login/LoginPage')
})

app.get('/main', (req, res) => {
    res.render('pages/main/MainPage')
})

app.get('/forms', (req, res) => {
    res.render('pages/forms/FormsPage')
})

app.get('/settings', (req, res) => {
    res.render('pages/settings/SettingsPage')
})

app.get('/reports', (req, res) => {
    res.render('pages/reports/ReportsPage')
})

app.get('/todo', (req, res) => {
    res.render('pages/base/NaoFeitoAinda')
})

app.get('/login', (req, res) => {
    res.render('pages/login/LoginPage')
})

app.listen(porta || 3000, async () => {
    try {
      console.log(`Servidor rodando em http://localhost:${porta || 3000}`)
    } catch (error) {
      console.error('Erro ao carregar as paginas:', error)
    }
  })