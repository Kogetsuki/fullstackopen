import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { commentBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'

import { Button, Form, Input } from '../styles/Styles'


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
      <Form onSubmit={addComment}>
        <span>
          <Input {...content.input} />
          <Button type='submit'>Add comment</Button>
        </span>
      </Form>
    </>
  )
}

export default CommentForm