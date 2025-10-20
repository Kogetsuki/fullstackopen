const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (req, res) => {
  const blogs =
    await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})


blogsRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id)
    return res.status(401).json({ error: 'invalid token' })

  const user = await User.findById(decodedToken.id)
  if (!user)
    return res.status(400).json({ error: 'UserId missing or invalid' })

  const newBlog = new Blog({
    ...req.body,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
  const opts = { new: true, runValidators: true, context: 'query' }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, opts)
  updatedBlog
    ? res.json(updatedBlog)
    : res.status(404).end()
})


module.exports = blogsRouter