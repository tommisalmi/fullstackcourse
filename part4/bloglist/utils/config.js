require('dotenv').config()
console.log('test enviroasdsaasdnment')
const PORT = process.env.PORT
console.log('process end node env is: ', process.env.NODE_ENV)
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = process.env.NODE_ENV === 'development' // test does not work here
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI


module.exports = {
    MONGODB_URI,
    PORT,
}