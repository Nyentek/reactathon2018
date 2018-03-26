import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import { Col, Row } from '../../components'

@inject('store') @observer
export default class Login extends Component {

	nameField = null
	emailField = null

	componentDidUpdate () {
		if (store.user.info) {
			this.props.parent.setState({ logged: true })
		}
	}

	componentDidMount () {
		let keyup = (event) => {
			event.preventDefault()
			if (event.keyCode === 13) {
				this.login()
			}
		}
		this.nameField.addEventListener('keyup', keyup)
		this.emailField.addEventListener('keyup', keyup)
	}

	checkAndAlert () {
		if (this.nameField.value === '') {
			alert('Definitely need a name right?')
			return true
		}
		if (this.emailField.value === '') {
			alert('Email is optional but we are making you enter it regardless!')
			return true
		}
	}

	login () {
		if (this.checkAndAlert()) {
			return
		}

		store.socket.emit('name', store.user.id,
			{ name: this.nameField.value, email: this.emailField.value })
	}

	render () {
		if (store.user.info) {
			return (<h1>LOGGING IN</h1>)
		}
		return (
			<Page>
				<FullRow centered>
					<Col>
						<Row centered>
							<img src="assets/images/pie.svg" alt="" className="button-pie" width="200" height="200"/>
						</Row>
						<h1>Reactberry Pie</h1>
						<Input placeholder="Name"
						       ref={ref => this.nameField = ReactDOM.findDOMNode(ref)}/>
						<Input type="email" placeholder="Email"
						       ref={ref => this.emailField = ReactDOM.findDOMNode(ref)}/>
						<Button onClick={::this.login} color="primary">
							Start!
						</Button>
					</Col>
				</FullRow>
			</Page>
		)
	}
}

const Page = styled.div`
	display: flex;
	height: 100%;
`

const FullRow = styled(Row)`
	width: 100%;
`

const Input = styled.input`
	margin: 8px 0;
`

const Button = styled.button`
	margin: 8px 0;
`