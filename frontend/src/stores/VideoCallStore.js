import { observable, action, computed, state, autorun, runInAction, useStrict } from 'mobx'

const API_KEY = '46086922'
const videoStyles = {
	height: 400,
	width: 400
}

export default class VideoCallStore {
	publisher = null
	session = null

	userVideoEle = null
	partnerVideoEle = null

	@observable session_id = '1_MX40NjA4NjkyMn5-MTUyMTkyNzE5ODExMH53MlRLVDJSQXArZmtYRDRoeTRnSVNrUEN-fg'
	@observable token = 'T1==cGFydG5lcl9pZD00NjA4NjkyMiZzaWc9MzBhY2MzYWZlODAwZWQzZmQ3MjU3MjZkZGQzMzNjZDU1NTRjOTI3OTpzZXNzaW9uX2lkPTFfTVg0ME5qQTROamt5TW41LU1UVXlNVGt5TnpFNU9ERXhNSDUzTWxSTFZESlNRWEFyWm10WVJEUm9lVFJuU1ZOclVFTi1mZyZjcmVhdGVfdGltZT0xNTIxOTI3NjczJm5vbmNlPTAuNDc4NTQwNjIzNTc3OTUxMjQmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUyMjAxNDA3MCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
	@observable loading = false
	@observable error = null
	// call controls
	@observable isAudioOn = true
	@observable isVideoOn = true
	@observable isFullScreen = false

	constructor (app) {
		Object.assign(this, app)
	}

	@computed
	get isActive () {
		// TODO: maybe add this.streams.length > 0 &&
		return this.session_id !== null && this.token !== null
	}

	// Handling all of our errors here by alerting them
	@action.bound
	handleError (error) {
		if (error) {
			alert(error.message)
		}
	}

	@action.bound
	connect (userVideo, partnerVideo) {
		this.userVideoEle = ReactDOM.findDOMNode(userVideo)
		this.partnerVideoEle = ReactDOM.findDOMNode(partnerVideo)
		this.session = OT.initSession(API_KEY, this.session_id)
			.on({ streamCreated: this.addStream })

		// Subscribe to a newly created stream

		// Create a publisher
		this.publisher = this.createPublisher()

		// Connect to the session
		this.session.connect(this.token, (error) => {
			// If the connection is successful, publish to the session
			if (error) {
				this.handleError(error)
			} else {
				this.session.publish(this.publisher, this.handleError)
			}
		})
	}

	@action.bound // adds a subscriber to the video call
	addStream ({ stream }) {
		const options = {
			...videoStyles,
			insertMode: 'before',
			style: {
				nameDisplayMode: 'off'
			}
		}

		this.session.subscribe(stream, this.partnerVideoEle, options)

	}

	createPublisher () {
		return OT.initPublisher(this.userVideoEle, {
			...videoStyles,
			name: 'RAWR',
			style: {
				nameDisplayMode: 'off'
			}
		}).on({
			accessDenied: e => {
				console.log('Access Denied:', e)
				this.error = 'Access Denied'
			}
		})
	}

	@action.bound
	toggleAudio () {
		this.isAudioOn = !this.isAudioOn
		this.publisher.publishAudio(this.isAudioOn)
	}

	@action.bound
	toggleVideo () {
		this.isVideoOn = !this.isVideoOn
		this.publisher.publishVideo(this.isVideoOn)
	}

	@action.bound
	setSession(sessionId){
		console.log("setting session: "+sessionId)
		this.session_id = sessionId
	}

	@action.bound
	setToken(token){
		console.log("setting token: "+token)
		this.token = token
	}

	@action.bound
	hangup () {
		if (!this.session) return
		this.session.unpublish(this.publisher)
		this.session.disconnect()
		this.publisher = null
		this.session.off('streamDestroyed')
		this.session.off('streamCreated')
		this.session = null
		this.isAudioOn = true
		this.isVideoOn = true
	}
}