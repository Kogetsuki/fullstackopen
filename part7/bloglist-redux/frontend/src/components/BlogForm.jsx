import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (event) =>
    setTitle(event.target.value)

  const handleAuthorChange = (event) =>
    setAuthor(event.target.value)

  const handleUrlChange = (event) =>
    setUrl(event.target.value)

  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input
              value={title}
              onChange={handleTitleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Author
            <input
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
        </div>

        <div>
          <label>
            Url
            <input
              type="url"
              value={url}
              onChange={handleUrlChange}
            />
          </label>
        </div>

        <button type='submit'>Create</button>

      </form>
    </>

  )
}

export default BlogForm