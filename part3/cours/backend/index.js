require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()


let notes = []

/* ------------------- HELPERS ----------------------- */

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

/* ---------------------- HANDLERS ------------------- */

app.get('/', (req, res) =>
  res.send('<h1>Hello World!</h1>'))


app.get('/api/notes', (req, res) => {
  Note.find({})
    .then(notes =>
      res.json(notes))
})


app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      note
        ? res.json(note)
        : res.status(404).end()
    })

    .catch(error =>
      next(error))
})


app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content)
    return res.status(400).json({
      error: 'content missing'
    })

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote =>
      res.json(savedNote))
})


app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(result =>
      res.status(204).end())

    .catch(error =>
      next(error))
})


app.put('/api/notes/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findById(req.params.id)
    .then(note => {
      if (!note)
        return res.status(404).end()

      note.content = content
      note.important = important

      return note.save()
        .then(updatedNote =>
          res.json(updatedNote))
    })

    .catch(error =>
      next(error))
})


const unknowEndpoint = (req, res) =>
  res.status(404).send({
    error: 'unknown endpoint'
  })

app.use(unknowEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError')
    return res.status(400).send({ error: 'Malformatted ID' })

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`))