import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'
import CommentForm from '../components/CommentForm'


const Blog = () => {
  const dispatch = useDispatch()

  const { id } = useParams()
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const loggedUser = useSelector(state => state.loggedUser)

  if (!blog || !blog.user)
    return null


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
    blog.user.id === loggedUser.id


  return (
    <>
      <h2>{blog.title} {blog.author}</h2>

      <a href={blog.url}>{blog.url}</a>

      <div>
        {blog.likes} likes
        <button onClick={handleLike}>
          Like
        </button>
      </div>

      <div>
        added by {blog.user.name}
      </div>

      {showDelete && (
        <button onClick={handleDelete}>
          Remove
        </button>
      )}

      <h3>Comments</h3>

      <CommentForm />

      <ul>
        {blog.comments.map(comment =>
          <li key={comment}>
            {comment}
          </li>
        )}
      </ul>
    </>
  )
}

export default Blog