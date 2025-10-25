import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleShowDetailsChange = () =>
    setShowDetails(!showDetails)


  const likeBlog = async () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: likes + 1,
    }

    await blogService.update(blog.id, updatedBlog)
    setLikes(likes + 1)
  }


  const deleteBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`))
      await handleDelete(blog.id)
  }


  const showDelete =
    blog.user.name === user.name


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
            likes {likes}
            <button onClick={likeBlog}>
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