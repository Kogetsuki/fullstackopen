require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [
  { content: 'HTML is easy', important: true },
  { content: 'Browser can execute only JavaScript', important: false }
]

Note.insertMany(notes)
  .then(() => {
    console.log('notes saved')
    mongoose.connection.close()
  })

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })