const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', (req, res) => {
    res.send('OK!')
})

const getClients = async () => Client.find({})

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

router.put('/client/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { propToUpdate } = req.query // should change to body
    const value = req.body.value

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { [propToUpdate]: value } })
    res.send(client)
})

router.put('/client/modal/:clientId', (req, res) => {
    const { clientId } = req.params
    const { name, country } = req.body

    // if(`${reqClient.name} ${reqClient.surname}` === currentClient.name) { delete reqClient.name }
    // if(reqClient.country === currentClient.country) { delete reqClient.country }

    Client.findOneAndUpdate({ _id: clientId }, { $set: { name, country } }, function (err, client) {
        res.send(`Updated client ${clientId}`)
    })
    // Should update only specific keys
})

router.post('/admin/populate-data', (req, res) => {
    const data = require('../data')

    const promises = []
    data.forEach(d => {
        const client = new Client(d)
        promises.push(client.save())
    })

    Promise.all(promises)
        .then(clients => {
            res.send({ status: 'success', data: clients })
        })
})

module.exports = router