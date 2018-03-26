import * as mobx from 'mobx'

export default class BaseStore {
	unwrap (object) {
		return mobx.toJS(object)
	}
}