const express = require('express');
const helmet = require('helmet');
const db = require('../db/dbConfig');

const server = express();

server.use(express.json());
server.use(helmet());

//endpoint sanity check
server.get('/', (req, res) => {
	res.send('api working');
});

// add whatever to whatever table
server.post('/add', (req, res) => {
	const body = req.body;
	db('thing')
		.insert(body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// list whatever
server.get('/things', (req, res) => {
	db('thing')
		.then(things => {
			res.status(200).json(things);
		})
		.catch(err => res.status(500).json(err));
});

module.exports = server;
