import { useMutation } from '@apollo/client/react'

import { useField } from '../hooks'
import { ALL_PERSONS, CREATE_PERSON } from '../queries'


const PersonForm = () => {
  const name = useField('text')
  const phone = useField('text')
  const street = useField('text')
  const city = useField('text')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({
      variables: {
        name: name.value,
        phone: phone.value,
        street: street.value,
        city: city.value
      }
    })

    name.reset()
    phone.reset()
    street.reset()
    city.reset()
  }


  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={submit}>
        <div>
          Name <input {...name.input} />
        </div>

        <div>
          Phone <input {...phone.input} />
        </div>
        <div>
          Street <input {...street.input} />
        </div>
        <div>
          City <input {...city.input} />
        </div>

        <button type='submit'>Add</button>
      </form>
    </>
  )
}


export default PersonForm