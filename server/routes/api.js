const express = require('express')
const router = express.Router()
const Client = require('../model/Client')


router.get('/sanity', (req, res) => {
    res.send('OK!')
})

router.get('/clients', async (req, res) => {
    const clients = await Client.find({})
    res.json(clients)
})

router.post('/clients', async (req, res) => {
    const client = new Client(req.body)
    await client.save()
    res.json(client)
})

router.put('/clients/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { property, value } = req.body

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { [property]: value } }, { new: true })
    res.json(client)
})

router.put('/clients/modal/:clientId', async (req, res) => {
    const { clientId } = req.params
    const { firstName, surname, country } = req.body

    const client = await Client.findOneAndUpdate({ _id: clientId }, { $set: { firstName, surname, country } }, { new: true })
    res.json(client)
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
    res.json({ status: 'success', data: clients })
})

module.exports = router