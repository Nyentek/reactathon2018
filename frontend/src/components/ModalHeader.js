import styled, {css} from 'styled-components'
import {Row, Icon, Button} from '../components'

export const ModalHeader = ({className, children, color = "blue", onClick}) => {
	return (
		<Container centerVertically spaceBetween>
			<Header {...{className, color}}>
				{children}
			</Header>
			<Button >
				<Icon color="primary" canClick onClick={onClick} icon="clear"/>
			</Button>
		</Container>
	)
}

const Container = styled(Row)`
`

const Header = styled.h2.attrs({
	className: ({className}) => `${className}`
})`
	margin: 0;
	width: 100%;
    padding: 2px 16px;
    color: black;
    background-color: white;
`