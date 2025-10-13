require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

let persons = []

/* ----------------- HELPERS --------------------- */

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) =>
  req.method === 'POST'
    ? JSON.stringify(req.body)
    : ''
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => req.path.startsWith('/.well-known/')
}))

/* -------------- HANDLERS ---------------- */

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons =>
      res.json(persons))
})


app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person =>
      res.json(person))
})


app.get('/info', (req, res) => {
  Person.countDocuments({})
    .then(count => {
      const date = new Date()

      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
    })
})


app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name)
    return res.status(400).json({
      error: 'name missing'
    })

  if (!body.number)
    return res.status(400).json({
      error: 'number missing'
    })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson =>
      res.json(savedPerson))
})


app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result =>
      result
        ? res.status(204).end()
        : res.status(404).send({ error: 'not found' })
    )
})


const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
)