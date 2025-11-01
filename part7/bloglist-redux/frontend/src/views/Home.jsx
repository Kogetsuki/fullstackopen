import { useRef } from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import BlogDisplay from '../components/BlogDisplay'
import { Container } from '../styles/Styles'

const Home = () => {
  const blogFormRef = useRef()

  return (
    <Container>
      <Togglable buttonLabel='Create new' ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>

      <BlogDisplay />
    </Container>
  )
}

export default Home