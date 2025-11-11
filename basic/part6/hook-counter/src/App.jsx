import Button from './components/Button'
import Display from './components/Display'
import CounterContext from './CounterContext'



const App = () => {


  return (
    <>
      <Display />
      <div>
        <Button type='DEC' label='-' />
        <Button type='INC' label='+' />
        <Button type='ZERO' label='0' />
      </div>
    </>
  )
}

export default App
