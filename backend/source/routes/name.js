const emitList = require('../utils/emitList')

module.exports = function (id, params) {
	console.log('event: "name" id: ' + id + ' params: ' + JSON.stringify(params))

	let user = global.users.get(id)
	user.name = params.name
	user.email = params.email

	user.socket.emit('name', user.toJson())

	emitList()
}