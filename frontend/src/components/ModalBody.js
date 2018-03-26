export const ModalBody = ({className, children}) => {
	return (
		<Body {...{className}}>
			{children}
		</Body>
	)
}

const Body = styled.div.attrs({
	className: ({className}) => `${className}`
})`
    padding: 0 .5rem .5rem;
`