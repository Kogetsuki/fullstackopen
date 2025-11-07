import { useQuery, useMutation } from '@apollo/client/react'
import { useField } from '../hooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'


const BirthyearForm = () => {
  const name = useField('text')
  const born = useField('number')

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, res) => {
      const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS })

      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: allAuthors.map(a =>
            a.name === res.data.editAuthor.name
              ? { ...a, ...res.data.editAuthor }
              : a
          )
        }
      })
    }
  })


  if (result.loading)
    return <div>loading...</div>

  const authors = result.data.allAuthors


  const submit = async (event) => {
    event.preventDefault()

    if (!name.value)
      return alert('Select an author')

    await editAuthor({
      variables: {
        name: name.value,
        setBornTo: Number(born.value)
      }
    })

    name.reset()
    born.reset()
  }


  return (
    <>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          Name
          <select {...name.input}>
            <option value=''>-- Choose author --</option>
            {authors.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          Born
          <input {...born.input} />
        </div>

        <button type='submit'>Update author</button>
      </form>
    </>
  )
}


export default BirthyearForm