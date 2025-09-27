import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(() => {
    personService
      .getPersons()
      .then(response =>
        setPersons(response.data))
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personToUpdate = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase())

    if (personToUpdate === undefined) {
      personService
        .createPerson(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }

    else if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with the new one ?`)) {
      personService
        .updatePerson(personToUpdate.id, personObject)
        .then(response => {
          setPersons(persons.map(person =>
            person.id === personToUpdate.id
              ? response.data
              : person
          ))
          setNewName('')
          setNewNumber('')
        })
        .catch(error =>
          alert(error.response.data.error)
        )
    }
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


  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deletePerson(id)
        .then(() =>
          setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          alert(`'${personToDelete.name}' was already removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        onChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </>
  )
}

export default App
