import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
  return (
    <>
      <Header str={course.name} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course