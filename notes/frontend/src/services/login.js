import axios from 'axios'
const baseUrl = import.meta.env.VITE_LOGIN_URL

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

export default { login }