import React, { useState } from 'react'


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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }   
    const nameInPersons = persons.map(person => person.name).includes(personObject.name)

    if (nameInPersons) alert(`${personObject.name} is already added to phonebook`)
    else setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
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