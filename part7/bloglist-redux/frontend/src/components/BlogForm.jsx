import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { Form, Input, Label, Button, Subtitle } from '../styles/Styles'


const BlogForm = () => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()

    dispatch(appendBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }))

    dispatch(sendNotification(`A new blog. ${title.value} by ${author.value} added`, 'success'))

    title.reset()
    author.reset()
    url.reset()
  }


  return (
    <>
      <Subtitle>Create new</Subtitle>

      <Form onSubmit={addBlog}>
        <Label>
          Title
          <Input {...title.input} />
        </Label>

        <Label>
          Author
          <Input {...author.input} />
        </Label>

        <Label>
          Url
          <Input {...url.input} />
        </Label>

        <Button type='submit' primary=''>Create</Button>
      </Form>
    </>
  )
}

export default BlogForm