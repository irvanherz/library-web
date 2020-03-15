import React from 'react'
import { useHistory } from 'react-router-dom'

function Main(props){
	const history = useHistory()
	history.replace('/books')
	return null
}

export default Main