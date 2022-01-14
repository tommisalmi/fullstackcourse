import React, { useEffect, useState } from 'react'
import axios from 'axios'

const FilterForm = ({newFilter, handleFilterChange}) => {
  return (
    <form>
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange}/>
    </div>
  </form>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {

  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName}
      onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber}
      onChange={handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  // console.log("persons is", persons)
  // console.log("persons[0] is", persons.[0].name)
  
  
  
  // persons.map(person => console.log(person.name))
  // persons.map(person => console.log("Person x", person))
  return (
    
    <div>
      {/* {persons.map(person => console.log(person))} */}
      {persons.map(person => <Person key={person.name} person={person}/>)}
    </div>
  )
}


const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')




  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook,[])

  // console.log("persons are:", persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }   
    const nameInPersons = persons.map(person => person.name.toLowerCase()).includes(personObject.name.toLowerCase())

    if (nameInPersons) alert(`${personObject.name} is already added to phonebook`) //this is
    else setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  // console.log("persons to show",personsToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}/> 

      <h2>add a new</h2>

      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange
      }/>

      <h2>Numbers</h2>
      
      <Persons persons={personsToShow}/>
      
    </div>
  )

}

export default App