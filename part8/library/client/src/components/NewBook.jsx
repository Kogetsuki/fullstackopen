import { useState } from 'react'
import { useField } from '../hooks'


const NewBook = (props) => {
  const title = useField('text')
  const author = useField('text')
  const published = useField('number')
  const genre = useField('text')
  const [genres, setGenres] = useState([])


  if (!props.show)
    return null


  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

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