import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'

// const baseUrl = 'https://morning-reef-54351.herokuapp.com/api/persons'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response)
  }
  
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request
  .then(response => response)
  // .catch(error => {
  //   console.log("Inside personservice, the error.response.data is: ", error)
  // })
  // .catch(error => console.log("the error is:", error) || error) 
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response)
}

const deleteObject = (id) => {
  //   console.log(id)
  //   console.log("It is ", `${baseUrl}/${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteObject: deleteObject
}
// myös export default { getAll, create, update } ok