const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', (req, res) => {
    res.send('OK!')
})

router.get('/clients', async (req, res) => {
    const clients = await Client.find({})
    res.send(clients)
})

router.post('/clients', async (req, res) => {
    const client = new Client(req.body)
    await client.save()
    res.send(client)
})

router.put('/clients/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { property, value } = req.body // should change to body

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { [property]: value } }, { new: true })
    res.send(client)
})

router.put('/clients/modal/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { firstName, surname, country } = req.body

    // if(`${reqClient.name} ${reqClient.surname}` === currentClient.name) { delete reqClient.name }
    // if(reqClient.country === currentClient.country) { delete reqClient.country }
    // Should update only specific keys

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { firstName, surname, country } }, { new: true })
    res.send(client)
})

router.post('/admin/populate-data', async (req, res) => {
    await Client.deleteMany({})

    const data = require('../data')
    const promises = []
    data.forEach(d => {
        const [firstName, surname] = d.name.split(' ')
        const client = new Client({ ...d, firstName, surname })
        promises.push(client.save())
    })

    const clients = await Promise.all(promises)
    res.send({ status: 'success', data: clients })
})

module.exports = router