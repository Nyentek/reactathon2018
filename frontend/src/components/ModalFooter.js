import styled, {css} from 'styled-components'

export const ModalFooter = ({className, children}) => {
	return (
		<Footer {...{className}}>
			{children}
		</Footer>
	)
}

const Footer = styled.div.attrs({
	className: ({className}) => `${className}`
})`
	text-align: center;
	padding: 2px 16px;
`