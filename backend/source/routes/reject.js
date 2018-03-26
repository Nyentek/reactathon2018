// Requested user has rejected the call request
module.exports = function (id) {
	console.log('event: "reject" id: ' + id)

	// Grab the requested user
	let requestee = global.users.get(id)

	// Grab the request
	let request = global.requests.get(requestee.id)

	// Grab the requester
	let requester = global.users.get(request.requesterId)

	// Delete the request
	global.requests.delete(requestee.id)
	console.log('Requests Size: ' + global.requests.size)

	// Notify the requester that the request has been rejected
	requester.socket.emit('reject', requestee.toJson())
}