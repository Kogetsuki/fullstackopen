import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () =>
  axios.get(baseUrl)

const createPerson = (newObject) =>
  axios.post(baseUrl, newObject)

const updatePerson = (id, newObject) =>
  axios.put(`${baseUrl}/${id}`, newObject)

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`)

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson
}