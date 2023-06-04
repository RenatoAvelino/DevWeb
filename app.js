const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.render('pages/index')
})
app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})