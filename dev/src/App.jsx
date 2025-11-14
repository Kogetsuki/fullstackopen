import { useState } from 'react'

const App = () => {

  return (
    <>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...born} />
        <br />
        height:
        <input {...height} />
      </form>

      <div>
        {name.value} {born.value} {height.value}
      </div>
    </>
  )
}

export default App
