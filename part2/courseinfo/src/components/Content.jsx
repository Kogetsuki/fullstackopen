const Content = ({ parts }) => {
  const sum = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      {parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
      <b>Total of {sum} exercises</b>
    </>
  )
}

export default Content