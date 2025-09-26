import { useState } from "react";

const Display = (props) =>
  <div>
    {props.value}
  </div>

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) =>
    () => setValue(newValue);

  return (
    <>
      <Display value={value} />
      <Button onClick={setToValue(1000)} text="Thousand" />
      <Button onClick={setToValue(0)} text="Reset" />
      <Button onClick={setToValue(value + 1)} text="Increment" />
    </>
  )
}

export default App;