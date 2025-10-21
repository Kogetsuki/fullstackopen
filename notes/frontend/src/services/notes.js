import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_URL


let token = null


const setToken = newToken =>
  token = `Bearer ${newToken}`


const getAll = () =>
  axios
    .get(baseUrl)
    .then(response => response.data)


const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newObject, config)

  return res.data
}


const update = (id, newObject) =>
  axios
    .put(`${baseUrl}/${id}`, newObject)
    .then(response => response.data)


export default {
  getAll,
  create,
  update,
  setToken
}
