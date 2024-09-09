const express = require('express');
const cors = require('cors');
const { createServer, request } = require('http');
const { Server } = require('socket.io');

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

const io = new Server(httpServer, {
	path: '/real-time',
	cors: {
		origin: '*', // Allow requests from any origin
	},
}); // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

const db = {
	users: [],
	characters: [],
	arms: [],
};

app.get('/users', (request, response) => {
	const users = db.users;
	response.send(users);
});

app.get('/characters', (request, response) => {
	const characters = db.characters;
	response.send(characters);
});

app.get('/arms', (request, response) => {
	const arms = db.arms;
	response.send(arms);
});

app.post('/user', (request, response) => {
	console.log(request.body);
	const { nameUser, lastNameUser, emailUser, socketId } = request.body;
	if (!nameUser || !lastNameUser || !emailUser || !socketId) {
		return response.status(400).send({
			message: 'Missing data',
		});
	}
	const newUser = { nameUser, lastNameUser, emailUser, socketId };
	db.users.push(newUser);
	io.emit('Server:NewUser', newUser);
	response.status(201).send(newUser); // We return the same object received and also I send a code 201 which means an object was created
});

app.post('/character', (request, response) => {
	const { nameCharacter, nivelCharacter, typeCharacter, socketId } = request.body;
	if (!nameCharacter || !nivelCharacter || !typeCharacter || !socketId) {
		return response.status(400).send({
			message: 'Missing data',
		});
	}
	const newCharacter = { nameCharacter, nivelCharacter, typeCharacter, socketId };
	db.characters.push(newCharacter);
	io.emit('Server:NewCharacter', newCharacter);
	response.status(201).send(newCharacter);
});

app.post('/arm', (request, response) => {
	const { nameArm, typeArm, modalidadArm, socketId } = request.body;
	if (!nameArm || !typeArm || !modalidadArm || !socketId) {
		return response.status(400).send({
			message: 'Missing data',
		});
	}
	const newArm = { nameArm, typeArm, modalidadArm, socketId };
	db.arms.push(newArm);
	io.emit('Server:NewArm', newArm);
	response.status(201).send(newArm);
});

io.on('connection', (socket) => {
	console.log('a user connected'); // This will be printed every time a client connects to the
	socket.on('chat-messages', (message) => {
		console.log(message);
		io.emit('chat-messages', message); // Broadcasts the message to all connected clients including the sender
		// socket.broadcast.emit("chat-messages", message); // Broadcasts the message to all connected clients except the sender
	});
});

httpServer.listen(5050, () => {
	// Starts the server on port 5050, same as before but now we are using the httpServer object
	console.log(`Server is running on http://localhost:${5050}`);
});
