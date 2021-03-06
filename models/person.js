const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected to MongoDB')

    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const pSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    phone: {
        type: String,
        required: true,
        minlength: 8
    }
})

pSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

pSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', pSchema)