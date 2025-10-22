import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL


let token = null


const setToken = newToken =>
  token = `Bearer ${newToken}`


const getAll = async () => {
  const res = axios.get(baseUrl)
  return res.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}


const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  return res.data
}


export default {
  getAll,
  create,
  update,
  setToken
}
