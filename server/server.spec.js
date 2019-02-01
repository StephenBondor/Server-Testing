const request = require('supertest');
const db = require('../db/dbConfig');
const server = require('./server');

// before and after Each or before and after All
afterEach(async () => {
	await db('thing').truncate();
});

describe('things and such', () => {
	it('should insert provided thing', async () => {
		const response = await request(server)
			.post('/add')
			.send({name: 'bilbo'});
		const things = await db('thing');
		expect(response).toHaveLength(1);
		expect(things[response[0] - 1].name).toEqual('bilbo');
		expect(response.status).toBe(201);
	});
	it('should FAIL to insert a poorly named thing', async () => {
		let response = await request(server)
			.post('/add')
			.send({nAmasdddE: 'bilbo'});
		expect(response.status).toBe(500);
		response = await request(server)
			.post('/add')
			.send({name: 7});
		expect(response.status).toBe(500);
		// response = await request(server)
		// 	.post('/add')
		// 	.send({nAmasdddE: 'bilbo'});
		// expect(response.status).toBe(500);
	});
});
