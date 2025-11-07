import { useQuery } from '@apollo/client/react'
import { useSelector, useDispatch } from 'react-redux'

import { ALL_BOOKS } from '../queries'
import { setGenre, resetGenre } from '../reducers/genreReducer'


const Books = (props) => {
  const dispatch = useDispatch()
  const selectedGenre = useSelector(state => state.genre)

  const allBooksResult = useQuery(ALL_BOOKS)

  const filteredBooksResult = useQuery(ALL_BOOKS, {
    variables:
      selectedGenre === 'All'
        ? {}
        : { genre: selectedGenre },
    skip: !props.show
  })

  if (!props.show)
    return null

  if (allBooksResult.loading || filteredBooksResult.loading)
    return <div>loading...</div>

  const allBooks = allBooksResult.data.allBooks
  const filteredBooks = filteredBooksResult.data.allBooks

  const genreList = [...new Set(allBooks.flatMap(b => b.genres))]


  return (
    <>
      <h2>Books</h2>
      <div>
        in genre <strong>{selectedGenre}</strong>
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

      {genreList.map(genre =>
        <button key={genre} onClick={() => dispatch(setGenre(genre))}>
          {genre}
        </button>
      )}
      <button onClick={() => dispatch(resetGenre())}>
        All genres
      </button>
    </>
  )
}

export default Books
