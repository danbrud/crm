const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', (req, res) => {
    res.send('OK!')
})

getClients = async () => Client.find({})

router.get('/clients', async (req, res) => {
    const clients = await getClients()
    res.send(clients)
})

router.get('/clients/actions', async (req, res) => {
    let clients = await getClients()
    clients = clients.map(c => ({ _id: c._id, name: c.name, owner: c.owner }))
    res.send(clients)
})

router.post('/client', async (req, res) => {
    const client = new Client({ ...req.body, emailType: null, sold: false })
    await client.save()
    res.send(client)
})

router.put('/client/:id', async (req, res) => {
    let clientId = req.params.id
    let propertyToUpdate = req.query.propToUpdate // should change to body
    let value = req.body.value

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { [propertyToUpdate]: value } })
    res.send(client)
})

router.put('/client/modal/:id', (req, res) => {
    let clientId = req.params.id
    let { name, country } = req.body

    // if(`${reqClient.name} ${reqClient.surname}` === currentClient.name) { delete reqClient.name }
    // if(reqClient.country === currentClient.country) { delete reqClient.country }

    Client.findOneAndUpdate({ _id: clientId }, { $set: { name, country } }, function (err, client) {
        res.send(`Updated client ${clientId}`)
    })
    // Should update only specific keys
})


module.exports = router