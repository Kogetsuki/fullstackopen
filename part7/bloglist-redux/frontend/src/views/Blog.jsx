import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'

import CommentForm from '../components/CommentForm'
import { BlogInfo, BlogTitle, Button, CommentItem, CommentList, CommentSection } from '../styles/Styles'


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
      <BlogInfo>
        <BlogTitle>
          {blog.title} {blog.author}
        </BlogTitle>

        <a href={blog.url}>{blog.url}</a>

        <div>
          {blog.likes} likes
          <Button onClick={handleLike}>
            Like
          </Button>
        </div>

        <div>
          added by {blog.user.name}
        </div>
      </BlogInfo>

      {showDelete && (
        <Button onClick={handleDelete}>
          Remove
        </Button>
      )}

      <CommentSection>
        <h3>Comments</h3>

        <CommentForm />

        <CommentList>
          {blog.comments.map(comment =>
            <CommentItem key={comment}>
              {comment}
            </CommentItem>
          )}
        </CommentList>
      </CommentSection>
    </>
  )
}

export default Blog