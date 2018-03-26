class Match {

	constructor (session, leftId, leftTk, rightId, rightTk) {
		this._session = session
		this._leftId = leftId
		this._leftTk = leftTk
		this._rightId = rightId
		this._rightTk = rightTk
		this._position = 0
	}

	get leftId () {
		return this._leftId
	}

	get rightId () {
		return this._rightId
	}

	set position (id) {
		this._position += id === this._leftId ? 0.05 : id === this._rightId ? -0.05 : 0
	}

	toJson () {
		return {
			session: this._session,
			leftId: this._leftId,
			leftTk: this._leftTk,
			rightId: this._rightId,
			rightTk: this._rightTk,
			position: this._position
		}
	}
}

module.exports = Match