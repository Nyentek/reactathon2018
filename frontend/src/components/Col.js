import styled, {css} from 'styled-components'

export const Col =  ({
	                     wrap, wrapReverse,                                                         //flex-wrap
						 centered,
	                     centerVertically, top, bottom, spaceBetween, spaceAround, spaceEvenly,     //justify-content
	                     left, right, centerHorizontally, stretchItems,                             //align-items
	                     colStart, colEnd, colCenter, colStretch, colSpaceBetween, colSpaceAround,  //align-content
	                     children,
	                     ...props
                     }) => {

	let flexWrap, justifyContent, alignItems, alignContent = ''

	//Flex-Wrap
	if(wrap){
		flexWrap = 'wrap'
	}else if(wrapReverse){
		flexWrap = 'wrap-reverse'
	}else{
		flexWrap = 'nowrap'
	}

	//Justify-Content
	if(centerVertically){
		justifyContent = 'center'
	}else if(top){
		justifyContent = 'flex-start'
	}else if(bottom){
		justifyContent = 'flex-end'
	}else if(spaceBetween){
		justifyContent = 'space-between'
	}else if(spaceAround){
		justifyContent = 'space-around'
	}else if(spaceEvenly){
		justifyContent = 'space-evenly'
	}

	//Align-Items
	if(centerHorizontally){
		alignItems = 'center'
	}else if(left){
		alignItems = 'flex-start'
	}else if(right){
		alignItems = 'flex-end'
	}else if(stretchItems){
		alignItems = 'stretch'
	}

	//Align-Content
	if(colCenter){
		alignContent = 'center'
	}else if(colStart){
		alignContent = 'flex-start'
	}else if(colEnd){
		alignContent = 'flex-end'
	}else if(colSpaceBetween){
		alignContent = 'space-between'
	}else if(colSpaceAround){
		alignContent = 'space-around'
	}else if(colStretch){
		alignContent = 'stretch'
	}

	if(centered){
		justifyContent = 'center'
		alignItems = 'center'
	}

	return (
		<Column flexWrap={flexWrap} justifyContent={justifyContent} alignItems={alignItems} alignContent={alignContent} {...props}>
			{children}
		</Column>
	)
}
const Column = styled.div.attrs({
	className: ({className}) => `${className}`
})`
	display: flex;
	flex-direction: column;
	flex-wrap: ${props => props.flexWrap};
	justify-content: ${props => props.justifyContent};
	align-content: ${props => props.alignContent};
	align-items: ${props => props.alignItems};
`