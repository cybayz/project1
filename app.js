var express = require('express');
//var exphbs  = require('express-handlebars');

const app = express()
//var hbs = exphbs.create({ /* config */ });
const port = 3000
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('assets'))