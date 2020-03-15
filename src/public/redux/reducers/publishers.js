const initialState = {
	items:[]
}

const publishers = (state=initialState, action) => {
	switch (action.type) {
	case 'PUBLISHERS_SET_DATA': {
		return {
			...state,
			...action.data
		}
	}
	default:
		return state
	}
}
	
export default publishers