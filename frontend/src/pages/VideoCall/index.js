import {inject, observer} from 'mobx-react'
import styled, {injectGlobal} from 'styled-components'
import {Col, Row} from '../../components/index'
import Overlay from './Overlay'

@inject('store') @observer
export default class VideoCall extends Component {

	componentDidMount() {
		const {videoCall} = store
		if (videoCall.session_id != null && videoCall.token != null) {
			videoCall.connect(this._partner, this._video)
		}
	}

	componentDidUpdate() {

	}

	render() {
		return (
			<Container>
				<CallContainer>
					{this.props.store.user.info.match.right ?
						<StyledRow centered>
							<VideoCol>
								<Video id="userVid" innerRef={r => this._video = r}/>
							</VideoCol>
							<VideoCol>
								<Video id="partnerVid" innerRef={r => this._partner = r}/>
							</VideoCol>
						</StyledRow>
						:
						<StyledRow centered>
							<VideoCol>
								<Video id="partnerVid" innerRef={r => this._partner = r}/>
							</VideoCol>
							<VideoCol>
								<Video id="userVid" innerRef={r => this._video = r}/>
							</VideoCol>
						</StyledRow>

					}
				</CallContainer>
				<StyledOverlay/>
			</Container>
		)
	}
}

const StyledRow = styled(Row)`
	justify-content: space-around;
	padding-top: 32px;
`

const CallContainer = styled.div`
	z-index: 0;
	position: absolute;
	width: 100%;
	left: 0;
	right: 0;
`

const StyledOverlay = styled(Overlay)`
	z-index: 1000;
`

const Container = styled.div`
	height: 100%;
	position: relative;
`

const Video = styled.div`
	border-radius: 50%;
`

const VideoCol = styled(Col)`
	margin: 20px;
`

injectGlobal`
	.OT_Root {
		margin-left: 5px !important;
		z-index: 2;
	}

	.OT_subscriber:hover:not(.maximized) {
		cursor: pointer;
		outline: 2px solid #EDF0F4;
	}

	.OT_widget-container {
		background: none !important;
		justify-content: center;
		display: flex;
	}

	.OT_video-poster {
		background-size: cover !important;
		height: 80px !important;
		width: 80px !important;
		top: 10px;
		left: 27px;

		border-radius: 4px;
		border: 2px solid #FFFFFF;
		box-shadow: 0 1px 3px -1px #656D79;
		object-fit: cover;
		font-family: 'object-fit: cover;';
	}

	.OT_edge-bar-item,
	.OT_audio-level-meter {
		display: none !important;
	}

	.OT_video-element {
		border-radius: 50%
	}

	.maximized {
		position: absolute !important;
		top: 0;
		left: 0;
		height: 100% !important;
		margin-left: 0 !important;
		width: 100% !important;
	}

	.maximized .OT_video-poster {
		width: 140px !important;
		height: 140px !important;
		left: calc(50% - 70px);
		top: calc(50% - 70px);
	}
`