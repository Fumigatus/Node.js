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
    const launch = {
        mission: 'To the Moon',
        rocket: 'XKJ-11D',
        target: 'Kepler-442 b',
        launchDate: 'January 11, 2026'
    }

    const launchWithoutDate = {
        mission: 'To the Moon',
        rocket: 'XKJ-11D',
        target: 'Kepler-442 b',
    }

    const launchInvalidData={
        mission: 'To the Moon',
        rocket: 'XKJ-11D',
        target: 'Kepler-442 b',
        launchDate: 'root'
    }
    test('It should respond 201', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launch)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(launch.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(requestDate).toBe(responseDate)

        expect(response.body).toMatchObject(launchWithoutDate)
    })

    test('Missing required properties control', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchWithoutDate)
            .expect(400)
        expect(response.body).toStrictEqual({
            error: 'Missing operator'
        })
    })
    test('Invalid date control', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchInvalidData)
            .expect(400)
        expect(response.body).toStrictEqual({
            error: 'Invalid launch date.'
        })
    })
})


