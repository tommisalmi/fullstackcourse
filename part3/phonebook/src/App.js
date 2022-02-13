// npm run server

import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) { 
    return null
  }
  return (
    <div className="notification">
      {message}
    </div> 
  )
}

const Error = ({message}) => {
  if (message === null) { 
    return null
  }
  return (
    <div className="error">
      {message}
    </div> 
  )
}


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

const Person = ({person, deletePerson}) => {
  // {console.log(person)}
  // console.log("typeof value inside Person component:", typeof(person))
  return (
    <div>
      <p>
        {person.name} {person.number} <button onClick={deletePerson(person)}>delete</button>
      </p>
    </div>
    
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    
    <div>
      {persons.map(person => <Person key={person.name} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)




  const hook = () => {
    // console.log("Calling hook")
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => console.log("An error occurred...", error))
  }

  useEffect(hook,[])

  const addPerson = (event) => {
    event.preventDefault()
    
    console.log("here we are!!!")
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const findPerson = persons.find(person =>  person.name.toLowerCase().trim() === newName.toLowerCase().trim())
    if (findPerson && window.confirm(`${findPerson.name} is already added in the phonebook, replace the old number with a new one?`)) {
      // console.log("inside the if-clause")
      personService
      .update(findPerson.id, newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== findPerson.id ? person : response.data)) //korvaa personObject uudella...)
        setNewName('')
        setNewNumber('')
        setNotification(`Updated ${newPerson.name}'s number`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log("An error occurred...", error)
        setError(`${newPerson.name} had been removed from the server. Please refresh the page and add the person again`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    }
    
    else {
      // console.log("inside the else clause")
      
      personService
      .create(newPerson)
      .then((response) => {
        // console.log("the response is:", response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log("An error occurred...", error.response.data)
        setError(`${error.response.data.error}`)
        setTimeout(() => {
          setError(null)
        }, 5000)
        
      })
    }

    

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

  const deletePerson = deletePerson => () => {
    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      personService
      .deleteObject(deletePerson.id)
      .then(response => {
        // console.log("logging the response: ", response.status)
        if (response.status === 204) {
          setPersons(persons.filter(person => person.id !== deletePerson.id))
          setNotification(`Deleted ${deletePerson.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        } 
        
      })
      .catch(error => {
        console.log("An error occurred...", error)
        setError(`${deletePerson.name} had already been removed from server`)
        setPersons(persons.filter(person => person.id !== deletePerson.id))
        setTimeout(() => {
          setError(null)
        }, 5000)
      })

    }
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Error message={error}/>
      <Notification message={notification}/>
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
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
      
    </div>
  )

}

export default App