import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/client/react'

import { ALL_BOOKS, CURRENT_USER } from '../queries'


const Recommandations = (props) => {
  const bookResult = useQuery(ALL_BOOKS, {
    skip: !props.show
  })
  const genreResult = useQuery(CURRENT_USER, {
    skip: !props.show
  })

  if (!props.show)
    return null

  if (bookResult.loading || genreResult.loading)
    return <div>loading...</div>

  const books = bookResult.data.allBooks
  const favoriteGenre = genreResult.data.me.favoriteGenre

  const filteredBooks =
    favoriteGenre
      ? books.filter(b => b.genres.includes(favoriteGenre))
      : books


  return (
    <>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>

          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}


export default Recommandations