import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response =>  response.data)
  }
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }

  const deleteObject = (id) => {
    //   console.log(id)
    //   console.log("It is ", `${baseUrl}/${id}`)
      const request = axios.delete(`${baseUrl}/${id}`)
      return request.then(response =>  response.statusText)
  }

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deleteObject: deleteObject
}
// myös export default { getAll, create, update } ok