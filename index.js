const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "phone": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "phone": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "phone": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122",
        "id": 4
    }
]

app.get('/info/', (req, res) => {
    res.send(`
    <p>Phonebook has info for ${persons.length}</p>
    <p>${new Date()}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const generateId = () => {
    const id = persons.length > 0
        ? Math.floor(Math.random() * 9999999) + 1     
        : 0
    return id
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.phone) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.filter(p => p.name === body.name).length > 0) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        phone: body.phone,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})


app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})