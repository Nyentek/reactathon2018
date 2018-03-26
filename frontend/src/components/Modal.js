import styled, {css} from 'styled-components'
import {Col} from './../components'

export class Modal extends Component {

	state = {
		isOpen: false
	}

	componentDidMount() {
		this.setState({
			isOpen: this.props.isOpen
		})
	}

	render() {
		const {className, children, isOpen, onClick} = this.props

		return (
			<Container isOpen={isOpen}>
				<Background onClick={onClick}/>
				<Content {...{className}}>
					{children}
				</Content>
			</Container>
		)
	}
}

const Container = styled(Col)`
	z-index: 7000;
	display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
`

const Background = styled.div`
    position: fixed;
    z-index: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
`

const Content = styled(Col)`
	z-index: 7001;
	position: relative;
    background-color: #fefefe;
    max-width: 640px;
    padding: 0;
    margin: auto;
    border: 1px solid #888;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    background-color: white;
`