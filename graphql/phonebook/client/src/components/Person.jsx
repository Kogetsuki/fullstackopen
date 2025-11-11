const Person = ({ person, onClose }) => {
  return (
    <>
      <h2>{person.name}</h2>

      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>

      <button onClick={onClose}>Close</button>
    </>
  )
}


export default Person