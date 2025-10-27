const baseUrl = 'http://localhost:3001/notes'


const getAll = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok)
    throw new Error('Failed to fetch notes')

  return await res.json()
}


const createNew = async (content) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    header: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, important: false })
  })

  if (!res.ok)
    throw new Error('Failed to create note')

  return await res.json()
}


export default {
  getAll,
  createNew
}