const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-icpr3.mongodb.net/people?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const pSchema = new mongoose.Schema({
    name: String,
    phone: String
})

const Person = mongoose.model('Person', pSchema)

if (process.argv[4]) {

    const person = new Person({
        name: process.argv[3],
        phone: process.argv[4]
    })

    person.save().then(response => {
        console.log('note saved!')
        mongoose.connection.close()
    })
} else {

    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}