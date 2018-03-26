import { Provider as MobxProvider } from 'mobx-react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import openSocket from 'socket.io-client'

import AppStore from './stores/AppStore'
import Login from './pages/Login'
import Users from './pages/UserList'
import Test from './pages/Test'
import VideoCall from './pages/VideoCall'

export default class App extends Component {

	state = {
		loading: true,
		logged: false,
	}

	constructor (props) {
		super(props)

		const socket = global.socket = openSocket('http://localhost:3000')
		socket.on('connect', () => {
			this.store.user.setId(socket.id)
			this.setState({ loading: false })
		})

		socket.on('start', (data) => {
			console.log("START")
			console.log(data)
			this.store.videoCall.setSession(data.session)
			this.store.videoCall.setToken(data.token)
			this.store.user.setMatch(data)

			this.setState({
				store: store
			})
		})

		this.store = global.store = new AppStore(socket)

		console.log('App Constructor Called')
	}

	render () {
		let user = this.store.user.info
		return ((this.state.loading ?
				<div>LOADING APP</div> :
				<MobxProvider store={this.store}>
					<Router>
						<Switch>
							<Route exact={true} path='/' render={props =>
								!user ? <Login {...props} parent={this}/> : !user.match? <Users {...props} parent={this}/> : <VideoCall/>}/>
						</Switch>
					</Router>
				</MobxProvider>
		))
	}
}