const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


describe('standard API calls', () => {
  test('get all blogs', async () => {
    const res =
      await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })


  test('create a new blog post', async () => {
    const newBlog = {
      title: "This is the new blog",
      author: "None of your business",
      url: "http://youllnevergetme.com",
      likes: 75690
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes("This is the new blog"))
  })


  test('delete blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    assert(!titles.includes(blogToDelete.title))
  })


  test('delete blog with wrong id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api.delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })


  test('update blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: 10000
    }

    const res = await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.likes, 10000)
  })


  test('update blog with malformatted id', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    await api.put(`/api/blogs/${invalidId}`)
      .expect(400)
  })


  test('update blog with non-existent id', async () => {
    const nonExistentId = '5a3d5da59070081a82a34451'
    await api.put(`/api/blogs/${nonExistentId}`)
      .expect(404)
  })
})


describe('content check', () => {
  test('check identifier name is id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
      assert.ok(blog.id)
      assert.ok(!blog._id)
    })
  })
})


describe('property missing', () => {
  test('if likes property missing, defaults to 0', async () => {
    const newBlog = {
      title: "Blog without likes",
      author: "Anonymous",
      url: "http://nolikes.com"
    }

    const res =
      await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.likes, 0)
  })


  test('if title missing, 400 BAD REQUEST', async () => {
    const blogWithoutTitle = {
      author: "Anonymous",
      url: "http://notitle.com",
      likes: 1234
    }

    await api.post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

  })


  test('if url missing, 400 BAD REQUEST', async () => {
    const blogWithoutUrl = {
      title: "No url",
      author: "Anonymous",
      likes: 1234
    }

    await api.post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
})



after(async () =>
  await mongoose.connection.close())