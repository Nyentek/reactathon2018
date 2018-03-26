const OpenTok = require('opentok'),
	opentok = new OpenTok('46086922', '8b9d6ca771691433f013714190401ef7ef66ea84')

const Match = require('../models/match')

// Requested user has accepted the call request
module.exports = function (id) {
	console.log('event: "accept" id: ' + id)

	// Grab the requested user
	let requestee = global.users.get(id)

	// Grab the request
	let request = global.requests.get(requestee.id)

	// Grab the requester
	let requester = global.users.get(request.requesterId)

	// Remove requester and requestee from lobby
	global.lobby = global.lobby.filter(user => user.id !== requestee.id && user.id !== requester.id)
	console.log('Lobby Length: ' + global.lobby.length)

	// Remove the request
	global.requests.delete(requestee.id)
	console.log('Requests Size: ' + global.requests.size)

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
			requester.id, opentok.generateToken(sessionId, { role: 'publisher' }),
			requestee.id, opentok.generateToken(sessionId, { role: 'publisher' }))

		// Assign match info to users
		requester.match = match
		requestee.match = match

		// Send match info
		let matchJson = match.toJson()
		requester.socket.emit('start', {
			right: false,
			id: matchJson.leftId,
			session: matchJson.session,
			token: matchJson.leftTk,
			position: matchJson.position
		})
		requestee.socket.emit('start', {
			right: true,
			id: matchJson.rightId,
			session: matchJson.session,
			token: matchJson.rightTk,
			position: matchJson.position
		})
	})
}