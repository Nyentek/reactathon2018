const OpenTok = require('opentok'),
	opentok = new OpenTok('46086922', '8b9d6ca771691433f013714190401ef7ef66ea84')

const Match = require('../models/match')

module.exports = function (id) {
	console.log('event: "lobby" id:' + id)

	// Grab the requester
	let requester = global.users.get(id)

	if (requester.match) {
		requester.socket.emit('lobby', { error: 'You are already in a match!' })
		return
	}

	// If requester is already in the lobby
	if (global.lobby.find(user => user.id === id)) {
		// Remove the user from the lobby
		global.lobby = global.lobby.filter(lobbiedUser => lobbiedUser.id !== requester.id)
		requester.socket.emit('lobby', { waiting: false })
		return
	}

	// If the lobby has no users waiting
	if (global.lobby.length === 0) {
		// No waiting users, so add the user
		global.lobby.push(requester)
		requester.socket.emit('lobby', { waiting: true })
		return
	}

	// Grab the waiting user
	let requestee = global.lobby[0]

	// Remove the waiting user from the lobby
	global.lobby = global.lobby.filter(lobbiedUser => lobbiedUser.id !== requestee.id)
	console.log('Lobby Length: ' + global.lobby.length)

	// Create OpenTok session
	opentok.createSession({
		mediaMode: 'relayed' // 'routed'
	}, function (error, session) {
		// Send OpenTok error
		if (error) {
			requester.socket.emit('lobby', 'Session Creation Error: ' + error.message)
			requestee.socket.emit('lobby', 'Session Creation Error: ' + error.message)
			return
		}

		// Create a match
		let sessionId = session.sessionId
		let match = new Match(sessionId,
			requestee.id, opentok.generateToken(sessionId, { role: 'publisher' }),
			requester.id, opentok.generateToken(sessionId, { role: 'publisher' }))

		// Assign match info to users
		requester.match = match
		requestee.match = match

		// Send match info
		let matchJson = match.toJson()
		requestee.socket.emit('start', {
			right: false,
			id: matchJson.leftId,
			session: matchJson.session,
			token: matchJson.leftTk,
			position: matchJson.position
		})
		requester.socket.emit('start', {
			right: true,
			id: matchJson.rightId,
			session: matchJson.session,
			token: matchJson.rightTk,
			position: matchJson.position
		})
	})
}