import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import NotificationContext from '../contexts/NotificationContext'

import { createBlog } from '../requests'
import { useField } from '../hooks'


const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const queryClient = useQueryClient()
  const { sendNotification } = useContext(NotificationContext)


  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      sendNotification(`A new blog. ${newBlog.title} by ${newBlog.author} added`, 'success')
    },
    onError: (error) =>
      sendNotification(`${error.message}`, 'error')
  })


  const addBlog = (event) => {
    event.preventDefault()

    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    })

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