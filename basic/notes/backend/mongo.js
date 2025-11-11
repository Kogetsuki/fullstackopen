require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})


const Note = mongoose.model('Note', noteSchema)
const User = mongoose.model('User', userSchema)

const notes = [
  { content: 'HTML is easy', important: true },
  { content: 'Browser can execute only JavaScript', important: false }
]

// Note.insertMany(notes)
//   .then(() => {
//     console.log('notes saved')
//     mongoose.connection.close()
//   })

// Note.deleteMany({})
//   .then(() => {
//     console.log('notes deleted')
//     mongoose.connection.close()
//   })

User.deleteMany({})
  .then(() => {
    console.log('users deleted')
    mongoose.connection.close()
  })

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })