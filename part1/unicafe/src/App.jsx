import { useState } from "react";

const Button = ({ onClick, text }) =>
  <button onClick={onClick}>
    {text}
  </button>

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}: </td>
    <td>{value}</td>
  </tr>

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad;

  return (
    <>
      <h1>Statistics</h1>
      {sum === 0
        ?
        <p>No feedback given</p>
        :
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={sum} />
            <StatisticLine text="Average" value={(good - bad) / sum} />
            <StatisticLine text="Positive" value={good / sum * 100 + ' %'} />
          </tbody>
        </table>
      }
    </>
  )
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"Good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"Bad"} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App