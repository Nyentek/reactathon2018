import styled from 'styled-components'
import { Icon } from '../../components/index'
import { inject, observer } from 'mobx-react'


const CallControls = observer(({ store: { videoCall }, rerender }) =>
	<Row>
		<AudioToggleButton onClick={videoCall.toggleAudio} active={videoCall.isAudioOn}/>
		<VideoToggleButton onClick={videoCall.toggleVideo} active={videoCall.isVideoOn}/>
		<HangupButton onClick={() => {
			videoCall.hangup()
		}}
		/>
	</Row>
)

const AudioToggleButton = ({ active, ...props }) => (
	<Action {...props} icon={active ? 'mic' : 'mic_off'}/>
)

const VideoToggleButton = ({ active, ...props }) => (
	<Action {...props} icon={active ? 'videocam' : 'videocam_off'}/>
)

const HangupButton = props => <Action {...props} icon='call_end'/>

const Action = styled(Icon).attrs({
	type: props => props.icon
})`
	padding: 10px 15px 15px;
	color: white;
	display: block;
	cursor: pointer;

	&:hover {
        background: darkblue;
	}
`

const Row = styled.div`
	background: blue;
	border-radius: 4px;
	margin: 15px 15px auto;
	overflow: hidden;
	z-index: 10;
	display: flex;
	flex-direction: row;
`

export default inject('store')(CallControls)