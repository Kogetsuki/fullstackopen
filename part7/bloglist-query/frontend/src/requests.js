const baseUrl = '/api/blogs'


const getToken = () => {
  const loggedUser = window.localStorage.getItem('loggedUser')

  if (!loggedUser)
    return null

  return JSON.parse(loggedUser).token
}


export const getBlogs = async () => {
  const res = await fetch(baseUrl)

  if (!res.ok)
    throw new Error('Failed to fetch blogs')

  return await res.json()
}


export const createBlog = async (newBlog) => {
  const token = getToken()

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(newBlog)
  }

  const res = await fetch(baseUrl, options)

  const result = await res.json()

  if (!res.ok)
    throw new Error(result.error || 'Failed to create blog')

  return result
}


export const updateBlog = async (updatedBlog) => {
  const token = getToken()

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(updatedBlog)
  }

  const res = await fetch(`${baseUrl}/${updatedBlog.id}`, options)

  if (!res.ok)
    throw new Error('Failed to update blog')

  return await res.json()
}


export const removeBlog = async (id) => {
  const token = getToken()

  const options = {
    method: 'DELETE',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` })
    }
  }
  const res = await fetch(`${baseUrl}/${id}`, options)

  if (!res.ok)
    throw new Error('Failed to delete blog')

  return
}