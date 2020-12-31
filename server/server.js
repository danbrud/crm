require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const api = require('./routes/api')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const app = express()

const inDevMode = process.env.NODE_ENV === 'development'

if (inDevMode) {
    app.use(cors())
} else {
    app.use(express.static(path.join(__dirname, '..', 'build')))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', api)

if (!inDevMode) {
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT
app.listen(PORT, function () {
    console.log('Server is up and running on port ' + PORT)
})