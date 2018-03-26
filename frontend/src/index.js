import ReactDOM from 'react-dom'
import App from './App'

if (module.hot) {
	console.log('HOT RELOADING!')
}

const render = Component => {
	ReactDOM.render(
		<Component/>,
		document.getElementById('main')
	)
}

render(App)
