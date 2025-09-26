import { useState } from "react";

const Display = ({ text, value }) =>
  <div>
    {text}: {value}
  </div>

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getSum = good + neutral + bad;
  const getAverage = (good - bad) / getSum;
  const getPositive = good / getSum * 100;

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"Good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"Bad"} />

      <h1>Statistics</h1>
      <Display text="Good" value={good} />
      <Display text="Neutral" value={neutral} />
      <Display text="Bad" value={bad} />
      <Display text="All" value={getSum} />
      <Display text="Average" value={getAverage} />
      <Display text="Positive" value={getPositive} />
    </>
  )
}

export default App