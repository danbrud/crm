const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', function (req, res) {
    res.send('OK!')
})

getClients = async () => Client.find({})

router.get('/clients', async function(req, res) {
    let clients = await getClients()
    res.send(clients)
})

router.get('/clients/actions', async function(req, res) {
    let clients = await getClients()
    let mappedClients = clients.map(c => {return {_id: c._id, name: c.name, owner: c.owner}})
    res.send(mappedClients)
})

router.post('/clients', function (req, res) {
    let reqClient = req.body
    console.log("saving")

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