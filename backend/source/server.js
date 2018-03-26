function handler (req, res) {
	res.writeHead(200).end('WebSockets Index Page')
}

const app = require('http').createServer(handler)
const io = require('socket.io')(app)

global.users = new Map()
global.requests = new Map()
global.lobby = []

const emitList = require('./utils/emitList')

const User = require('./models/user')

io.on('connection', function (socket) {
	global.users.set(socket.id, new User())
	global.users.get(socket.id).socket = socket

	socket.on('disconnect', function () {
		let user = global.users.get(socket.id)

		// Check if the user is currently lobbied
		if (global.lobby.find(lobbiedUser => lobbiedUser.id === user.id)) {
			global.lobby = global.lobby.filter(lobbiedUser => lobbiedUser.id !== user.id)
		}

		// Update requests
		for (let request of global.requests.values()) {
			if (user.id === request.requesterId) {
				global.requests.delete(request.id)
			} else if (user.id === request.id) {
				global.users.get(request.requesterId).socket.emit('reject')
			}
		}

		// Check if the user has an active match
		if (user.match) {

			// Grab match players
			let firstPlayer = global.users.get(user.match.leftId)
			let secondPlayer = global.users.get(user.match.rightId)

			// Notify second player that user is disconnected
			if (firstPlayer.id === user.id) {
				secondPlayer.match = null
				secondPlayer.socket.emit('stop')
			} else {
				firstPlayer.match = null
				firstPlayer.socket.emit('stop')
			}
		}

		// Remove disconnected user
		global.users.delete(socket.id)

		emitList()
	})

	socket.on('name', require('./routes/name'))
	socket.on('request', require('./routes/request'))
	socket.on('accept', require('./routes/accept'))
	socket.on('reject', require('./routes/reject'))
	socket.on('lobby', require('./routes/lobby'))
	socket.on('move', require('./routes/move'))
})

app.listen(3000)