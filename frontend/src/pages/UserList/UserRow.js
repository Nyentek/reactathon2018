import { Icon } from '../../components'
import { inject, observer } from 'mobx-react'

@inject('store') @observer
export default class UserRow extends Component {

	componentDidMount () {
		store.socket.on('request', data => {
			console.log('---------- REQUEST ----------')
			console.log(data)
			console.log('---------- REQUEST ----------')
		})
	}

	challenge () {
		let { user } = this.props

		store.socket.emit('request', store.user.id, { id: user.id })
	}

	render () {
		let { user } = this.props

		return (
			<RowStyle>
				<Data>
					<Icon color="green" icon={status ? 'videogame_asset' : 'videogame_asset'} lg/>
				</Data>
				<Data>{user.name}</Data>
				<Data>{user.email}</Data>
				{!user.match ?
					<td>
						<ChallengeB onClick={::this.challenge}>
							<img src="assets/images/pie.svg" alt="" className="button-pie" width="20" height="20"/>
							Challenge
						</ChallengeB>
					</td>
					: <Data>{user.name}</Data>}
			</RowStyle>
		)
	}
}


let Data = styled.td`
margin-right: 50px;
margin-left: 50px;
font-size: 0.8em;
padding-left: 5px;
color: black;
`

let RowStyle = styled.tr`
background: lightgrey;
`

let ChallengeB = styled.button`
display: flex;
flex-direction: row;
align-items: center;
background: transparent;
top-margin: 5px;
padding: 4px;
cursor: pointer;
font-size: .8em;
color: #ff5050;
border: 1px solid #ff5050;
border-radius: 5px;

*{
	display: inline-block;
}
`
		


