class User {

	constructor () {
		this._id = ''
		this._name = ''
		this._email = ''
		this._socket = null
		this._match = null
	}

	get id () {
		return this._id
	}

	get match () {
		return this._match
	}

	set match (value) {
		this._match = value
	}

	get socket () {
		return this._socket
	}

	set socket (value) {
		this._socket = value
		this._id = value.id
	}

	get name () {
		return this._name
	}

	set name (value) {
		this._name = value
	}

	get email () {
		return this._email
	}

	set email (value) {
		this._email = value
	}

	toJson () {
		return {
			id: this._id,
			name: this._name,
			email: this._email,
			match: this._match ? this._match.toJson() : null
		}
	}
}

module.exports = User