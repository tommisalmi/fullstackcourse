import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const len = anecdotes.length
  const [points, setPoints] = useState(Array(len).fill(0))

  const newAnecdote = () => {
    const randomIndex = Math.floor(Math.random()*len)
    setSelected(randomIndex)
  }
  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }
  
  const getMaxIndex = (arr) => {
    const max = Math.max(...arr)
    const index = arr.indexOf(max)
    return (index)

  }

  return (
    <div>
      
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="vote"/>
      <Button handleClick={newAnecdote} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[getMaxIndex(points)]}</p>
      <p>has {points[getMaxIndex(points)]} votes</p>

      
    </div>
  )
}

export default App