const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')


const getTokenFrom = req => {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer '))
    return authorization.replace('Bearer ', '')

  return null
}


notesRouter.get('/', async (req, res) => {
  const notes =
    await Note
      .find({})
      .populate('user', { username: 1, name: 1 })

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

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id)
    return res.status(401).json({ error: 'invalid token' })

  const user = await User.findById(decodedToken.id)
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