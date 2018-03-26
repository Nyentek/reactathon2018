module.exports = function () {
	let users = [...global.users.values()]
	for (let user of users) {
		let list = users.filter(u => u.id !== user.id && u.name !== '').map(u => u.toJson())
		user.socket.emit('list', list)
	}
}