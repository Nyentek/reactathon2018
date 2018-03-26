import { action, observable } from 'mobx'

export default class UsersStore {

	@observable list = []

	constructor (socket) {
		socket.on('list', data => {
			console.log('---------- LIST ----------')
			console.log(data)
			console.log('---------- LIST ----------')
			this.setList(data)
		})
	}

	@action
	setList (list) {
		this.list = list
	}
}