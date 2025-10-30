import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const handleShowDetailsChange = () =>
    setShowDetails(!showDetails)


  const handleLike = () => {
    dispatch(likeBlog(blog.id))
    dispatch(sendNotification(`Blog ${blog.title} liked`))
  }


  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(sendNotification('Blog deleted', 'success'))
    }
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
            <button onClick={handleLike}>
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>

          {showDelete && (
            <button onClick={handleDelete}>
              Remove
            </button>
          )}
        </>
      )}
    </div>
  )
}


export default Blog