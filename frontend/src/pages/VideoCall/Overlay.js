import {Col, Row} from '../../components/index'
import styled, { injectGlobal } from 'styled-components'

import * as animationData from "../../anim/data"
import lottie from "lottie-web"

const NumberOfFrames = 600
const Offset = 300
const RightFrameMax = 562
const LeftFrameMax = 25

export default class Overlay extends Component {

	state = {
		currentFrame: 1,
		animationIsPlaying: false,
		increment: 10
	}

	componentDidMount() {
		this.options = {
			container: this.el,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData,
		}

		this.anim = lottie.loadAnimation(this.options)

		let currentFrame = this.anim.totalFrames / 2
		this.anim.goToAndStop(currentFrame, true)
		this.setState({currentFrame: currentFrame})

		store.socket.on('move', data => {
			if (this.state.animationIsPlaying) {
				return
			}

			let currentFrame = ((this.anim.totalFrames / 2) * data.position) + this.anim.totalFrames / 2
			//let currentFrame = this.state.currentFrame + this.state.increment > this.anim.totalFrames - 1 ?
			//	this.anim.totalFrames - 1 : this.state.currentFrame + this.state.increment

			if (currentFrame >= RightFrameMax || currentFrame <= LeftFrameMax) {
				if (currentFrame <= LeftFrameMax) {
					this.anim.setDirection(-1)
				}
				this.anim.play()
				this.setState({animationIsPlaying: true})

				currentFrame = this.anim.totalFrames / 2
				this.anim.onComplete = () => {
					this.setState({animationIsPlaying: false})
					this.anim.setDirection(1)
				}
			} else {
				this.anim.goToAndStop(currentFrame, true)
			}
			this.setState({currentFrame})
		})
	}

	handleClick = () => {
		store.socket.emit('move', store.socket.id)
	}

	render() {
		return (
			<CallCol>
				<Row centered>
					<div ref={(c) => {
						this.el = c
					}}
					/>
				</Row>
				<Row centered>
					<div className="button-container">
						<button className="button-control" onClick={this.handleClick}>
							<img src="assets/images/base.svg" alt="" className="button-base"
							     width="512" height="230"/>
							<div className="button-shadow"></div>
							<img src="assets/images/button.svg" alt="" className="button-top"
							     width="320" height="216"/>
						</button>
					</div>
				</Row>
			</CallCol>
		)
	}
}

const CallCol = styled(Col)`
	position: absolute;
	top: -108px;
`