import { useMutation } from '@apollo/client/react'
import { useEffect } from 'react'
import { useField } from '../hooks'
import { EDIT_NUMBER } from '../queries'


const PhoneForm = ({ setError }) => {
  const name = useField('text')
  const phone = useField('text')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)


  const submit = (event) => {
    event.preventDefault()

    changeNumber({
      variables: {
        name: name.value,
        phone: phone.value
      }
    })

    name.reset()
    phone.reset()
  }


  useEffect(() => {
    if (result.data && result.data.editNumber === null)
      setError('Person not found')
  }, [result.data])


  return (
    <>
      <h2>Change number</h2>

      <form onSubmit={submit}>
        <div>
          Name <input {...name.input} />
        </div>

        <div>
          Phone <input {...phone.input} />
        </div>

        <button type='submit'>Change number</button>
      </form>
    </>
  )
}


export default PhoneForm