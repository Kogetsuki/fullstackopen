import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>
        setPersons(response.data))
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.some(person => person.name === newName)
      ? alert(`${personObject.name} is alrady added to phonebook`)
      : setPersons(persons.concat(personObject))

    setNewName('')
    setNewNumber('')
  }


  const handleNameChange = (event) =>
    setNewName(event.target.value)


  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)


  const handleFilterChange = (event) =>
    setFilter(event.target.value)


  const personsToShow = filter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons


  return (
    <>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </>
  )
}

export default App
