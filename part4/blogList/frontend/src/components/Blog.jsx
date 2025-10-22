import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
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
        </>
      )}
    </div>
  )
}

export default Blog