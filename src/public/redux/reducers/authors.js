const initialState = {
	items:[]
}

const authors = (state=initialState, action) => {
	switch (action.type) {
	case 'AUTHORS_SET_DATA': {
		return {
			...state,
			...action.data
		}
	}
	default:
		return state
	}
}
	
export default authors