import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete, handleLike }) => {
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
    handleLike(blog.id)
    setLikes(likes + 1)
  }


  const deleteBlog = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`))
      await handleDelete(blog.id)
  }


  const showDelete =
    blog.user.id === user.id


  return (
    <div className='blog' style={blogStyle}>
      <span className='blog-title'>
        {blog.title}
      </span>
      <span className='blog-author'>
        {blog.author}
      </span>
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