import Axios from 'axios'

export const reload = (token, params) => {
	return dispatch => {
		const headers = {
			Authorization: token
		}
		return Axios.get(`${process.env.REACT_APP_API_HOST}/publishers`, {headers, params}).then(
			result => {
				dispatch({
					type:'PUBLISHERS_SET_DATA',
					data: {isError: false, ...result.data.data}
				})
			}
		)
	}
}