const mongoose = require('mongoose')
const data = require('../data')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: String,
    email: String,
    firstContact: Date,
    emailType: String,
    sold: Boolean,
    owner: String,
    country: String
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client

const saveToDB = function(data) {
    for(let d of data) {
      let client = new Client(d)
      client.save()
    }
    console.log("Finished saving")
  }

//   console.log(data)
// saveToDB(data)