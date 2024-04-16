const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./Routing/routes')
const session = require('express-session');
require('dotenv').config()

const app = express()
app.use(express.static('public'))


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));

app.use('/', routes)


const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
