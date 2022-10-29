const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

const server = http.createServer(app) // why don't we use mongoose connect?...

const mongoUrl = config.MONGODB_URI
logger.info('test')
logger.info('mongourl is: ', mongoUrl)
mongoose.connect(mongoUrl)

const PORT = config.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})