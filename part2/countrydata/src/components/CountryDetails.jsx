import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (country.capital) {
      weatherService
        .getWeather(country.capital[0])

        .then(response =>
          setWeather(response.data))

        .catch(err => console.error(err))
    }
  }, [country])

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>
            {lang}
          </li>
        )}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
      />

      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <div>Temperature {weather.main.temp} Celsius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </>
      )}
    </>
  )
}

export default CountryDetails