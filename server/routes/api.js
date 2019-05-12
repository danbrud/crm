const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', function (req, res) {
    res.send('OK!')
})




router.post('/clients', function (req, res) {
    let reqClient = req.body

    let newClient = new Client({
        _id: reqClient._id,
        name: reqClient.name,
        email: reqClient.email,
        firstContact: reqClient.firstContact,
        emailType: reqClient.emailType,
        sold: reqClient.sold,
        owner: reqClient.owner,
        country: reqClient.country
    })

    let save = newClient.save()
    save.then(function(client) {
        res.send(`Saved client - id: ${client._id}, name: ${client.name}`)
    })
})


module.exports = router