import styled, {css} from 'styled-components'

export const Row = ({
	                    wrap, wrapReverse,                                                          //flex-wrap
						centered,
	                    centerHorizontally, left, right, spaceBetween, spaceAround, spaceEvenly,    //justify-content
	                    top, bottom, centerVertically, stretchItems,                                //align-items
	                    rowStart, rowEnd, rowCenter, rowStretch, rowSpaceBetween, rowSpaceAround,   //align-content
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
	if(centerHorizontally){
		justifyContent = 'center'
	}else if(left){
		justifyContent = 'flex-start'
	}else if(right){
		justifyContent = 'flex-end'
	}else if(spaceBetween){
		justifyContent = 'space-between'
	}else if(spaceAround){
		justifyContent = 'space-around'
	}else if(spaceEvenly){
		justifyContent = 'space-evenly'
	}

	//Align-Items
	if(centerVertically){
		alignItems = 'center'
	}else if(top){
		alignItems = 'flex-start'
	}else if(bottom){
		alignItems = 'flex-end'
	}else if(stretchItems){
		alignItems = 'stretch'
	}

	//Align-Content
	if(rowCenter){
		alignContent = 'center'
	}else if(rowStart){
		alignContent = 'flex-start'
	}else if(rowEnd){
		alignContent = 'flex-end'
	}else if(rowSpaceBetween){
		alignContent = 'space-between'
	}else if(rowSpaceAround){
		alignContent = 'space-around'
	}else if(rowStretch){
		alignContent = 'stretch'
	}

	if(centered){
		justifyContent = 'center'
		alignItems = 'center'
	}

	return (
		<ContainerRow flexWrap={flexWrap} justifyContent={justifyContent} alignItems={alignItems} alignContent={alignContent} {...props}>
			{children}
		</ContainerRow>
	)
}

const ContainerRow = styled.div.attrs({
	className: ({className}) => `${className}`
})`
	display: flex;
	flex-direction: row;
	flex-wrap: ${props => props.flexWrap};
	justify-content: ${props => props.justifyContent};
	align-content: ${props => props.alignContent};
	align-items: ${props => props.alignItems};
`