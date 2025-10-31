import { useRef } from 'react'

import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import BlogDisplay from '../components/BlogDisplay'


const Home = () => {
  const blogFormRef = useRef()

  return (
    <>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <BlogDisplay />
    </>
  )
}

export default Home