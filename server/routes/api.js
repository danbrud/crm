const express = require('express')
const router = express.Router()
// const Transaction = require('../model/Transaction')


router.get('/sanity', function (req, res) {
    res.send('OK!')
})




module.exports = router