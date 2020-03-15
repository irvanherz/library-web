import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './pages/Main'
import Books from './pages/Books'

function App() {
	return (
		<Switch>
			<Route exact path='/'><Main /></Route>
			<Route path='/books'><Books /></Route>
		</Switch>
	)
}

export default App
