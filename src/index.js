//import
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')
const path = require('path')
const route = require('./routes')

//khoi tao app - cau hinh port
const app = express()
const port = process.env.PORT || 3000
console.log(__dirname)

//set path public
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// app.use(morgan('combined'))

//set path views
app.engine('hbs', engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/resources/views'))

//routes init
route(app )

//server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
