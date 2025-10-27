const baseUrl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok)
    throw new Error('Failed to fetch anecdotes')

  return await res.json()
}


const createNew = async (content) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  })

  if (!res.ok)
    throw new Error('Failed to create new anecdote')

  return res.json()
}


const update = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!res.ok)
    throw new Error('Failed to update anecdote')

  return res.json()
}


export default {
  getAll,
  createNew,
  update
}