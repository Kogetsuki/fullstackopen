import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show)
    return null

  if (result.loading)
    return <div>loading...</div>

  const books = result.data.allBooks


  return (
    <>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>

          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Books
