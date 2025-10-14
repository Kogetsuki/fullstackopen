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


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person =>
      person
        ? res.json(person)
        : res.status(404).end())

    .catch(error =>
      next(error))
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


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson =>
      res.json(savedPerson))

    .catch(error =>
      next(error))
})


app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result =>
      result
        ? res.status(204).end()
        : res.status(404).send({ error: 'not found' }))

    .catch(error =>
      next(error))
})


app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const opts = { new: true, runValidators: true, context: 'query' }

  Person.findByIdAndUpdate(req.params.id, { name, number }, opts)
    .then(updatedPerson =>
      updatedPerson
        ? res.json(updatedPerson)
        : res.status(404).end())

    .catch(error =>
      next(error))
})


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'Malformatted ID' })

    case 'ValidationError':
      return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
)