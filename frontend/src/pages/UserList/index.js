import UserRow from './UserRow'
import {Row} from '../../components'
import { inject, observer } from 'mobx-react/index'

import {Modal, ModalBody, ModalHeader} from "../../components";

@inject('store') @observer
export default class Users extends Component {

	state = {
		showModal: false,
		requesterName: ''
	}

	componentDidMount () {
		store.socket.on('join', data => {
			for (let user of store.users.list) {
				console.log("user:")
				console.log(user.name)
				if (user.id === data.requesterId) {
					console.log("name:")
					console.log(user.name)
					this.setState({
						showModal: true,
						requester: user.name
					})
				}
			}
		})
	}

	closeModal () {
		this.setState({ showModal: false })
	}

	createList (users) {
		if (users === []) {
			return
		}

		let rows = []
		for (let user of users) {
			rows.push(<UserRow
				key={rows.length}
				user={user}/>)
		}
		return rows
	}

	render () {
		return (
			<div>
				<Table>
					<tbody>
					<RowStyle>
						<th>Status</th>
						<th>Username</th>
						<th>Useremail</th>
						<th></th>
					</RowStyle>
					{this.createList(store.users.list)}
					</tbody>
				</Table>
				<Modal isOpen={this.state.showModal} onClick={::this.closeModal}>
					<ModalHeader onClick={::this.closeModal}>
						<Row centerHorizontally>Someone wants to Challenge you!</Row>
					</ModalHeader>
					<ModalBody>
						<Row centered>
							<button onClick={() => {
								store.socket.emit('accept', store.user.id)
							}}>
								Yes
							</button>
							<button onClick={() => {
								store.socket.emit('reject', store.user.id)
							}}>
								No
							</button>
						</Row>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}

let Table = styled.table`
	position: absolute; 
	top: 5px;
	width: 30%;
	
`;

let RowStyle = styled.tr`
    background: lightgrey;
`;



let Challenge = styled.h1`
    text-align: center;
`;

let YButton = styled.button`
    margin: 50px;
`;

