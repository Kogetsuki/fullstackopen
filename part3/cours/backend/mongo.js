const mongoose = require('mongoose')

// Check if the password argument is provided in the command line
if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(0)
}

const password = process.argv[2]
const url = `mongodb+srv://Kogetsuki:${password}@cluster0.n9nntbv.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// Disable strict query mode for mongoose (allows flexible querying)
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define a schema for notes, specifying the structure of note documents
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// Create a model based on the schema, representing the 'notes' collection
const Note = mongoose.model('Note', noteSchema)

// Create a new note instance with specified content and importance
const note = new Note({
  content: 'New note',
  important: true,
})

// Save the note to the database
// note.save().then(result => {
//   console.log('Note saved')
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note =>
    console.log(note))

  mongoose.connection.close()
})