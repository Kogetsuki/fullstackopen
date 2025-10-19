const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})


notesRouter.get('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  note
    ? res.json(note)
    : res.status(404).end()
})


notesRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  if (!user)
    return res.status(400).json({ error: 'userId missing or not valid' })

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  res.status(201).json(savedNote)
})


notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


notesRouter.put('/:id', (req, res, next) => {
  const opts = { new: true, runValidators: true, context: 'query' }

  Note.findByIdAndUpdate(req.params.id, req.body, opts)
    .then(updatedNote =>
      updatedNote
        ? res.json(updatedNote)
        : res.status(404).end())

    .catch(error =>
      next(error))
})


module.exports = notesRouter