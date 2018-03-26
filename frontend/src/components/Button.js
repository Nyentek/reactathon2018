import {ButtonText} from "../components";

export const Button = ({className, children, color, ...props}) => {
	return (
		<Btn {...{className}} {...props}>
			<Text {...{color}}>
				{children}
			</Text>
		</Btn>
	)
}

const Btn = styled.button`
	border: 0;
	background-color:white;
	white-space: nowrap;
    padding: 0.375rem 1rem 0.5rem;
    border-radius: .2rem;
`

const Text = styled.div`
	cursor: default;
`