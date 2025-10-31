import { useSelector } from 'react-redux'
import { Table, TableHeader, TableRow, TableCell } from '../styles/Styles'


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
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.blogs.length}</TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}


export default Users