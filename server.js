const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/crmDB", { useNewUrlParser: true })

const app = express()
const api = require('./server/routes/api')

app.use(express.static(path.join(__dirname, 'build')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api', api)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = 3000
app.listen(process.env.PORT || port, function () {
    console.log('Server is up and running on port ' + port)
})