const initialState = {
	items:[]
}

const books = (state=initialState, action) => {
	switch (action.type) {
	case 'BOOKS_SET_DATA': {
		return {
			...state,
			...action.data
		}
	}
	default:
		return state
	}
}

export default books
