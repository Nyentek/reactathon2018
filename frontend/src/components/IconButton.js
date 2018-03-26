import { Icon } from '../components'

export const IconButton = ({ className, children, color, icon, ...props }) => {

	return (
		<Btn {...props}>
			<Icon color={color} icon={icon}/>
			{children}
		</Btn>
	)
}

const Btn = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	background: transparent;
	border: 0;
	margin: 0;
	padding: 4px;
	cursor: pointer;
	
	*{
		display: inline-block;	
	}
`

