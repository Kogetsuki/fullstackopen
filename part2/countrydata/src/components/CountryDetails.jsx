const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
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
    </>
  )
}

export default CountryDetails