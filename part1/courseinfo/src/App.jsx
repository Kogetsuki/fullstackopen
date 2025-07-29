const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <>
      <Header str={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

const Header = ({ str }) => (
  <h1>{str}</h1>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <p key={part.name}>
        {part.name} {part.exercises}
      </p>
    ))}
  </>
);

const Total = ({ parts }) => (
  <>
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  </>
);

export default App;