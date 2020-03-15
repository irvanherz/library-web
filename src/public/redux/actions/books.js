import Axios from 'axios'

export const reload = (token, params) => {
	return dispatch => {
		const headers = {
			Authorization: token
		}
		return Axios.get(`${process.env.REACT_APP_API_HOST}/books`, {headers, params}).then(result => {
			dispatch({
				type:'BOOKS_SET_DATA',
				data: result.data.data
			})
		})
	}
}