const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) =>
  res.json(persons))

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)

  person
    ? res.json(person)
    : res.status(404).end()
})

app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()

  res.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
    `)
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 1000)
  const body = req.body

  if (!body.name)
    return res.status(400).json({
      error: 'name missing'
    })

  if (!body.number)
    return res.status(400).json({
      error: 'number missing'
    })

  if (persons.some(p => p.name === body.name))
    return res.status(400).json({
      error: 'name must be unique'
    })

  const person = {
    id: String(id),
    ...body
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT)