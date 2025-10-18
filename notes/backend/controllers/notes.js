const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})


notesRouter.get('/:id', (req, res, next) =>
  Note.findById(req.params.id)
    .then(note =>
      note
        ? res.json(note)
        : res.status(404).end())

    .catch(error =>
      next(error))
)


notesRouter.post('/', async (req, res, next) => {
  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  const savedNote = await note.save()
  res.status(201).json(savedNote)
})


notesRouter.delete('/:id', (req, res, next) =>
  Note.findByIdAndDelete(req.params.id)
    .then(() =>
      res.status(204).end())

    .catch(error =>
      next(error))
)


notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body
  const opts = { new: true, runValidators: true, context: 'query' }

  Note.findByIdAndUpdate(req.params.id, { content, important }, opts)
    .then(updatedNote =>
      updatedNote
        ? res.json(updatedNote)
        : res.status(404).end())

    .catch(error =>
      next(error))
})


module.exports = notesRouter