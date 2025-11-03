const Persons = ({ persons }) => {
  return (
    <>
      <h2>Persons</h2>

      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
        </div>
      )}
    </>
  )
}


export default Persons