import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'


const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    dispatch(appendBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }))

    dispatch(sendNotification(`A new blog. ${title.value} by ${author.value} added`, 'success'))

    title.reset()
    author.reset()
    url.reset()
  }


  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>
            Title
            <input {...title.input} />
          </label>
        </div>

        <div>
          <label>
            Author
            <input {...author.input} />
          </label>
        </div>

        <div>
          <label>
            Url
            <input {...url.input} />
          </label>
        </div>

        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default BlogForm