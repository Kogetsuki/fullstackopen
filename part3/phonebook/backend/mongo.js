const mongoose = require('mongoose')

const nbArgs = process.argv.length

if (nbArgs < 3) {
  console.log('Give password as argument')
  process.exit(0)
}

const password = process.argv[2]
const url = `mongodb+srv://Kogetsuki:${password}@cluster0.n9nntbv.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

// Disable strict query mode for mongoose (allows flexible querying)
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Define schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// Create model based on schema
const Person = mongoose.model('Person', personSchema)

const AddPerson = () => {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person
    .save()
    .then(result => {
      console.log(`Added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    })
}

const DisplayPhonebook = () => {
  Person
    .find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person =>
        console.log(`${person.name} ${person.number}`))

      mongoose.connection.close()
    })
}

if (nbArgs === 3)
  DisplayPhonebook()

else
  AddPerson()