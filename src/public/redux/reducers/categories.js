const initialState = {
	items:[]
}

const categories = (state=initialState, action) => {
	switch (action.type) {
	case 'CATEGORIES_SET_DATA': {
		return {
			...state,
			...action.data
		}
	}
	default:
		return state
	}
}
	
export default categories