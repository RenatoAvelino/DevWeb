const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})