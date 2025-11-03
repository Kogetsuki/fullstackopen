import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

import Person from './Person'
import { FIND_PERSON } from '../App'


const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)

  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch
  })

  if (nameToSearch && result.data)
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )

  return (
    <>
      <h2>Persons</h2>

      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            Show address
          </button>
        </div>
      ))}
    </>
  )
}


export default Persons