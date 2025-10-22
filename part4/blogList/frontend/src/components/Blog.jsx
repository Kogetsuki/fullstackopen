import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShowDetailsChange = () =>
    setShowDetails(!showDetails)

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
            likes {blog.likes}
            <button>Like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  )
}

export default Blog