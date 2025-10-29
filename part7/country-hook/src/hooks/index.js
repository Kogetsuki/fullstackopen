import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) =>
    setValue(event.target.value)

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name)
      return

    const fetchCountry = async () => {
      try {
        const res = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        if (!res.ok)
          throw new Error('Country not found')

        const data = await res.json()
        setCountry({ data, found: true })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name]) // runs whenever `name` changes


  return country
}
