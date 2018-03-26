import { action, observable } from 'mobx'

export default class UserStore {

	id = ''
	@observable info = null

	constructor (socket) {
		socket.on('name', data => {
			console.log('---------- NAME ----------')
			console.log(data)
			console.log('---------- NAME ----------')
			this.setInfo(data)
		})
	}

	setId (id) {
		this.id = id
	}

	@action
	setInfo (info) {
		this.info = info
	}

	@action
	setMatch(match){
		this.info.match = match
	}
}
