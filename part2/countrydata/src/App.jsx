import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
      .getCountries()

      .then(response =>
        setCountries(response.data)
      )
  }, [])


  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }


  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )


  const renderCountries = () => {
    if (!search)
      return null

    const nbCountries = countriesToShow.length

    if (nbCountries > 10)
      return <p>Too many matches, specify another filter</p>

    if (nbCountries > 1) {
      return (
        <>
          <ul>
            {countriesToShow.map(country =>
              <li key={country.cca3}>
                {country.name.common}
              </li>
            )}
          </ul>
        </>
      )
    }

    if (nbCountries === 1)
      return <CountryDetails country={countriesToShow[0]} />
  }


  return (
    <>
      Find countries
      <input
        value={search}
        onChange={handleSearchChange}
      />
      {renderCountries()}
    </>
  )
}

export default App
