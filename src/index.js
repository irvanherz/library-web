import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import storage from './public/redux/store'
import { BrowserRouter } from 'react-router-dom'
import { SemanticToastContainer} from 'react-semantic-toasts'
import 'react-semantic-toasts/styles/react-semantic-alert.css'

const { store, persistor } = storage

ReactDOM.render(
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<BrowserRouter>
				<App />
				<SemanticToastContainer animation='fade' position="bottom-left" />
			</BrowserRouter>
		</PersistGate>
	</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
