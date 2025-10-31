import { useSelector } from 'react-redux'
import { Table, TableHeader, TableRow, TableCell } from '../styles/Styles'
import { Link } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <>
      <h2>Users</h2>

      <Table>
        <TableHeader>
          <TableCell></TableCell>
          <TableCell>blogs created</TableCell>
        </TableHeader>

        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </TableCell>
            <TableCell>
              {user.blogs.length}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}


export default Users