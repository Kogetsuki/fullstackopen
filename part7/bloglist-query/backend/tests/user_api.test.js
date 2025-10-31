const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('when there is initially one user in db', () => {
  test('simple get', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
  })


  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const res = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(res.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })


  test('new user with missing username', async () => {
    const newUser = {
      name: 'Anonymous',
      password: '1234'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })


  test('new user with username too short', async () => {
    const newUser = {
      username: 'Hi',
      name: 'Anonymous',
      password: '154232'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })


  test('new user with missing password', async () => {
    const newUser = {
      username: '1234',
      name: 'Anonymous'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })


  test('new user with password too short', async () => {
    const newUser = {
      username: 'HiThere',
      name: 'Anonymous',
      password: '12'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
  })
})


after(async () =>
  await mongoose.connection.close())