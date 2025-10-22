const NoteForm = ({
  onSubmit,
  handleChange,
  value
}) => {
  return (
    <>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange} />

        <button type="submit">
          Save
        </button>
      </form>
    </>
  )
}

export default NoteForm