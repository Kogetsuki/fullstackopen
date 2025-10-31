import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const User = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(u => u.id === id))

  if (!user)
    return null

  return (
    <>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>

      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            {blog.title}
          </li>
        )}
      </ul>
    </>
  )
}

export default User