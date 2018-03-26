import openSocket from 'socket.io-client'

export default class Test extends Component {

	componentDidMount () {
		const socket = global.socket = openSocket('http://localhost:3000')
		socket.on('connect', function () {
			socket.emit('name', socket.id, { name: 'Jason Hsu', email: 'email@email.com' })
		})

		socket.on('name', function (data) {
			console.log(data)
			console.log('NAME SET')
		})
		socket.on('list', function (data) {
			console.log(data)
			console.log('LIST GOT')
		})

		socket.on('lobby', function (data) {
			console.log(data)
			console.log('LOBBY')
		})

		socket.on('join', function (data) {
			console.log(data)
			console.log('JOIN?')
		})

		socket.on('reject', function (data) {
			console.log(data)
			console.log('REJECTED!')
		})

		socket.on('start', function (data) {
			console.log(data)
			console.log('START!')
		})

		socket.on('move', function (data) {
			console.log(data)
			console.log('MOVE!')
		})

		socket.on('stop', function (data) {
			console.log(data)
			console.log('OTHER PARTY DISCONNECT!')
		})
	}

	render () {
		return (
			<div>
				<h1>YO YO YO</h1>
			</div>
		)
	}
}