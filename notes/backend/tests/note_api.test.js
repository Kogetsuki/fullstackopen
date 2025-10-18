const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () =>
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
)

test('all notes are returned', async () => {
  const res = await api.get('/api/notes')
  assert.strictEqual(res.body.length, 4)
})

test('a specific note is within the returned notes', async () => {
  const res = await api.get('/api/notes')
  const contents = res.body.map(e => e.content)

  assert(contents.includes('HTML is easy'))
})

after(async () =>
  await mongoose.connection.close())