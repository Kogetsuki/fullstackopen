const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
  const blogs =
    await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })

  res.json(blogs)
})


blogsRouter.post('/', userExtractor, async (req, res) => {
  const newBlog = new Blog({
    ...req.body,
    user: req.user
  })

  const savedBlog = await newBlog.save()
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()

  res.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id)
  if (!blogToDelete)
    return res.status(404).json({ error: 'blog doesnt exist' })

  if (blogToDelete.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: 'forbidden: not your blog' })

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