const socket = io('http://localhost:5050', {
	path: '/real-time',
});

let socketId = null;
socket.on('connect', () => {
	socketId = socket.id;
});

const formUser = document.getElementById('form-new-user');
formUser.addEventListener('submit', async (event) => {
	event.preventDefault();
	const nameUser = document.getElementById('name').value;
	const lastNameUser = document.getElementById('last-name').value;
	const emailUser = document.getElementById('email').value;
	const userData = {
		nameUser,
		lastNameUser,
		emailUser,
		socketId,
	};

	try {
		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		if (!response.ok) {
			alert('Error al guardar el usuario');
		}
		alert('Usuario guardado correctamente');
		formUser.reset();
	} catch (error) {
		console.error(error);
	}
});

socket.on('Server:NewUser', (newUser) => {
	successLogin(newUser);
});

const divFormUser = document.getElementById('div-new-user');
const divInfoCharacter = document.getElementById('div-info-character');

function successLogin(user) {
	divFormUser.style.display = 'none';
	divInfoCharacter.style.display = 'block';
}

const formInfoCharacter = document.getElementById('form-new-character');
formInfoCharacter.addEventListener('submit', async (event) => {
	event.preventDefault();
	const nameCharacter = document.getElementById('nameCharacter').value;
	const nivelCharacter = document.getElementById('nivelCharacter').value;
	const typeCharacter = document.getElementById('typeCharacter').value;
	const characterData = {
		nameCharacter,
		nivelCharacter,
		typeCharacter,
		socketId,
	};
	try {
		const response = await fetch('http://localhost:5050/character', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(characterData),
		});
		if (!response.ok) {
			alert('Error al guardar el character');
		}
		formInfoCharacter.reset();
		alert('Character guardado correctamente');
	} catch (error) {
		console.error(error);
	}
});

socket.on('Server:NewCharacter', (newCharacter) => {
	successCharacter(newCharacter);
});

const divArmsCharacter = document.getElementById('div-arms-character');

function successCharacter(character) {
	divInfoCharacter.style.display = 'none';
	divArmsCharacter.style.display = 'block';
}

const formNewArm = document.getElementById('form-new-arm');
formNewArm.addEventListener('submit', async (event) => {
	event.preventDefault();
	const nameArm = document.getElementById('nameArm').value;
	const typeArm = document.getElementById('typeArm').value;
	const modalidadArm = document.getElementById('modalidadArm').value;
	const armData = {
		nameArm,
		typeArm,
		modalidadArm,
		socketId,
	};
	try {
		const response = await fetch('http://localhost:5050/arm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(armData),
		});
		if (!response.ok) {
			alert('Error al guardar la arma');
		}
		formNewArm.reset();
		alert('Arma guardada correctamente');
	} catch (error) {
		console.error(error);
	}
});

socket.on('Server:NewArm', (newArm) => {
	successArm(newArm);
});

const divInfo = document.getElementById('info');
function successArm(arm) {
	divArmsCharacter.style.display = 'none';
	divInfo.style.display = 'block';
}

const buttonUsers = document.getElementById('show-users');
const buttonCharacters = document.getElementById('show-characters');
const buttonArms = document.getElementById('show-arms');
const buttonCreateArm = document.getElementById('create-arm');
buttonUsers.addEventListener('click', async () => {
	try {
		const response = await fetch('http://localhost:5050/users');
		if (!response.ok) {
			alert('Error al obtener los usuarios');
		}
		alert('Se obtuvieron todos los usuarios');
		const data = await response.json();
		renderUsers(data);
	} catch (error) {
		console.error(error);
	}
});

const list = document.getElementById('list');

function renderUsers(users) {
	list.innerHTML = '';
	users.forEach((user) => {
		const item = document.createElement('div');
		item.innerHTML = `
    <p>${user.nameUser}</p>
    <p>${user.emailUser}</p>
    `;
		list.appendChild(item);
	});
}

buttonCharacters.addEventListener('click', async () => {
	try {
		const response = await fetch('http://localhost:5050/characters');
		if (!response.ok) {
			alert('Error al obtener los personajes');
		}
		alert('Se obtuvieron todos los personajes');
		const data = await response.json();
		renderCharacters(data);
	} catch (error) {
		console.error(error);
	}
});

function renderCharacters(characters) {
	list.innerHTML = '';
	characters.forEach((character) => {
		const item = document.createElement('div');
		item.innerHTML = `
    <p>${character.nameCharacter}</p>
    <p>${character.nivelCharacter}</p>
    <p>${character.typeCharacter}</p>
    `;
		list.appendChild(item);
	});
}

buttonArms.addEventListener('click', async () => {
	try {
		const response = await fetch('http://localhost:5050/arms');
		if (!response.ok) {
			alert('Error al obtener los armas');
		}
		alert('Se obtuvieron todos los armas');
		const data = await response.json();
		renderArms(data);
	} catch (error) {
		console.error(error);
	}
});

function renderArms(arms) {
	list.innerHTML = '';
	arms.forEach((arm) => {
		const item = document.createElement('div');
		item.innerHTML = `
    <p>${arm.nameArm}</p>
    <p>${arm.typeArm}</p>
    <p>${arm.modalidadArm}</p>
    `;
		list.appendChild(item);
	});
}

buttonCreateArm.addEventListener('click', () => {
	list.innerHTML = '';
	divInfo.style.display = 'none';
	divArmsCharacter.style.display = 'block';
});
