const request = require('supertest')
const app = require('../../app')


describe('Test GET /launches', () => {
    test('It should respond 200', async () => {
        const response = await request(app)
            .get('/launches')
            .expect(200)
            .expect('Content-Type', /json/)
        // expect(response.statusCode).toBe(200)
    })
})

describe('Test POST /launches', () => {
    test('IT should respond 200', () => {

    })
    test('Missing required properties control', () => {

    })
    test('Invalid date control', () => {

    })
})