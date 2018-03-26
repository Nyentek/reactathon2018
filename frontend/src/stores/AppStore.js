import BaseStore from './BaseStore'
import UserStore from './UserStore'
import UsersStore from './UsersStore'
import VideoCallStore from './VideoCallStore'

class AppStore extends BaseStore {

	constructor (socket) {
		super()
		this.socket = socket
		this.user = new UserStore(socket)
		this.users = new UsersStore(socket)
		this.videoCall = new VideoCallStore(this)
	}
}

export default AppStore