const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok)
    throw new Error('Failed to fetch anecdotes')

  return await res.json()
}


export const createAnecdote = async (newAnecdote) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote)
  }

  const res = await fetch(baseUrl, options)

  const result = await res.json()

  if (!res.ok)
    throw new Error(result.error || 'Failed to create anecdote')

  return result
}


export const updateAnecdote = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const res = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

  if (!res.ok)
    throw new Error('Failed to update anecdote')

  return await res.json()
}