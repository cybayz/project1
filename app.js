var express = require('express');
var exphbs  = require('express-handlebars');
const hbs = require('hbs');
const routes = require('./routes/router');

const app = express();
const path = require('path');
const port = 3000;

//setting view engine
hbs.registerPartials(__dirname + '/views/partials');
app.engine('handlebars', exphbs({ 
    extname: 'hbs',
    defaultLayout: 'index', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//enable router file
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//css and js fies
app.use(express.static('assets'))