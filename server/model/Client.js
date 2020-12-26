const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstName: String,
    surname: String,
    email: String,
    firstContact: {
        type: Date,
        default: function () {
            return new Date()
        }
    },
    emailType: { type: String, default: null },
    sold: { type: Boolean, default: false },
    owner: String,
    country: String
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client