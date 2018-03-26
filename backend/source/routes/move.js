module.exports = function (id) {
	console.log('event: "move" id: ' + id)

	// Grab the user
	let user = global.users.get(id)

	// Grab the user's match
	let match = user.match

	// Update match position
	match.position = user.id

	// Grab the match players
	let firstPlayer = global.users.get(match.leftId)
	let secondPlayer = global.users.get(match.rightId)

	// Notify players of match details change
	let matchJson = match.toJson()
	firstPlayer.socket.emit('move', {
		right: false,
		id: matchJson.leftId,
		position: matchJson.position
	})
	secondPlayer.socket.emit('move', {
		right: true,
		id: matchJson.rightId,
		position: matchJson.position
	})
}