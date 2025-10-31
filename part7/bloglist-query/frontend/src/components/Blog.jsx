import { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateBlog, removeBlog } from '../requests'

import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [showDetails, setShowDetails] = useState(false)

  const queryClient = useQueryClient()
  const { sendNotification } = useContext(NotificationContext)
  const { user } = useContext(UserContext)


  const handleShowDetailsChange = () =>
    setShowDetails(!showDetails)


  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['blogs'] }),
    onError: (error) =>
      sendNotification(`${error.message}`, 'error')
  })


  const deleteBlogMutation = useMutation({
    mutationFn: removeBlog,
    onSuccess: () => {
      queryClient.setQueryData(['blogs'], oldBlogs =>
        oldBlogs.filter(b => b.id !== blog.id))
      sendNotification(`${blog.title} deleted`, 'success')
    },
    onError: (error) =>
      sendNotification(`${error.message}`, 'error')
  })


  const likeBlog = (blog) => {
    const blogForServer = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    const blogForFrontend = {
      ...blog,
      likes: blog.likes + 1,
    }

    updateBlogMutation.mutate(blogForServer, {
      onSuccess: () => {
        queryClient.setQueryData(['blogs'], oldBlogs =>
          oldBlogs.filter(b =>
            b.id !== blog.id
              ? blogForFrontend
              : b))

        sendNotification(`You liked '${blog.title}'`)
      }
    })
  }


  const deleteBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`))
      deleteBlogMutation.mutate(blog.id)
  }


  const showDelete =
    blog.user.id === user.id


  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleShowDetailsChange}>
        {showDetails
          ? 'Hide'
          : 'View'}
      </button>

      {showDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => likeBlog(blog)}>
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>

          {showDelete && (
            <button onClick={deleteBlog}>
              Remove
            </button>
          )}
        </>
      )}
    </div>
  )
}


export default Blog