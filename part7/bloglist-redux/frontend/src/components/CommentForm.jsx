import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { commentBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'


const CommentForm = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const content = useField('text')


  const addComment = (event) => {
    event.preventDefault()

    dispatch(commentBlog(id, content.value))
    dispatch(sendNotification('Comment added', 'success'))

    content.reset()
  }


  return (
    <>
      <form onSubmit={addComment}>
        <div>
          <input {...content.input} />
          <button type='submit'>Add comment</button>
        </div>
      </form>
    </>
  )
}

export default CommentForm