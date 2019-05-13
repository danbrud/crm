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

router.post('/client', function (req, res) {
    let reqClient = req.body

    let newClient = new Client({
        name: reqClient.name,
        email: reqClient.email,
        firstContact: reqClient.firstContact,
        emailType: null,
        sold: false,
        owner: reqClient.owner,
        country: reqClient.country
    })

    let save = newClient.save()
    save.then(function(client) {
        res.send(`Saved client - id: ${client._id}, name: ${client.name}`)
    })
})

router.put('/client/:id', function(req, res) {
    let clientId = req.params.id
    let propertyToUpdate = req.query.propToUpdate
    let value = req.body.value

    Client.findOneAndUpdate({_id: clientId}, {$set: {[propertyToUpdate]: value}}, function (client) {
        res.send(`Updated client ${clientId}`)
    })
})


module.exports = router