module.exports = function (id, params) {
	console.log('event: "request" id: ' + id + ' params: ' + JSON.stringify(params))

	// Get requesting user
	let requester = global.users.get(id)

	// Get the requested user
	let requestee = global.users.get(params.id)

	if (global.requests.get(requestee.id)) {
		requestee.socket.emit('request', 'User has already been challenged!')
		return
	}
	if (global.requests.get(requester.id)) {
		requester.socket.emit('request', 'You already have an open challenge!')
		return
	}

	// Create the request
	let request = {
		id: requestee.id,
		requesterId: requester.id
	}

	// Save request
	global.requests.set(request.id, request)

	// Send request to requestee
	requestee.socket.emit('join', request)
}