const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)



// empty the database first

// then populate the database with the example data

// finally start conducting the tests

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog identifier is called id', async () => {
    const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            console.log("logging blog: ", blog)
            expect(blog.id).toBeDefined()
        })
})

afterAll(() => {
    mongoose.connection.close()
})