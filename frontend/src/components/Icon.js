export const Icon = ({ icon, lg, className, color = 'gray', ...props }) =>
	<I {...{ className, color, lg }} {...props}>{icon}</I>


const I = styled.i.attrs({
	className: ({ className }) => `material-icons ${className}`
})`
	font-size: ${props => props.lg ? '1.5rem' : '1rem'};
	vertical-align: middle;
	color: ${props => props.color};
	user-select: none;
`