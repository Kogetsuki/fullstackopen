import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { useField } from '../hooks'
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'


const NewBook = (props) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })


  if (!props.show)
    return null


  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: {
        title: title.value,
        author: author.value,
        published: Number(published.value),
        genres: genres
      }
    })

    title.reset()
    author.reset()
    published.reset()
    genre.reset()
    setGenres([])
  }


  const addGenre = () => {
    setGenres(genres.concat(genre.value))
    genre.reset()
  }


  return (
    <>
      <form onSubmit={submit}>
        <div>
          Title
          <input {...title.input} />
        </div>

        <div>
          Author
          <input {...author.input} />
        </div>

        <div>
          Published
          <input {...published.input} />
        </div>

        <div>
          <input {...genre.input} />
          <button onClick={addGenre} type='button'>
            Add genre
          </button>
        </div>

        <div>Genres: {genres.join(' ')}</div>

        <button type='submit'>Create book</button>
      </form>
    </>
  )
}

export default NewBook