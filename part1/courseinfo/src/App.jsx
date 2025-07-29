const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <>
      <Header str={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        ex1={exercises1}
        ex2={exercises2}
        ex3={exercises3}
      />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </>
  )
}

const Header = ({ str }) => {
  return (
    <>
      <h1>{str}</h1>
    </>
  )
}

const Content = ({ part1, part2, part3, ex1, ex2, ex3 }) => {
  return (
    <>
      <Part part={part1} exercises={ex1} />
      <Part part={part2} exercises={ex2} />
      <Part part={part3} exercises={ex3} />
    </>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <>
      <p>{part} {exercises}</p>
    </>
  )
}

const Total = ({ ex1, ex2, ex3 }) => {
  return (
    <>
      <p>Number of exercises {ex1 + ex2 + ex3}</p>
    </>
  )
}

export default App;