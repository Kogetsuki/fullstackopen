const SearchInput = ({ value, onChange }) => {
  return (
    <>
      <label>Find countries: </label>
      <input
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default SearchInput