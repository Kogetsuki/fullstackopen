require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})

const Blog = mongoose.model('Blog', blogSchema)
const User = mongoose.model('User', userSchema)

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

const users = [
  { username: 'root', name: 'Anonymous', passwordHash: 'osef' }
]

// User.deleteMany({})
//   .then(() =>
//     mongoose.connection.close())

User.insertMany(users)
  .then(() => {
    console.log('users saved')
    mongoose.connection.close()
  })

// Blog.insertMany(blogs)
//   .then(() => {
//     console.log('blogs saved')
//     mongoose.connection.close()
//   })