const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/crmDB", { useNewUrlParser: true })

const app = express()
const api = require('./server/routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', api)

const port = 3001
app.listen(port, function () {
    console.log('Server is up and running on port ' + port)
})