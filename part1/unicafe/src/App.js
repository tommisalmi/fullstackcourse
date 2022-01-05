import React, { useState } from 'react'

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
    return(
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good-bad)/all}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good/all)*100} %</td>
          </tr>

        </tbody>
      </table>
    )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="Good"/>
      <Button handleClick={handleNeutralClick} text="Neutral"/>
      <Button handleClick={handleBadClick} text="Bad"/>

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App