import {
	SUCCESS,
	ERROR,
	CLEAR
} from '../actions'

export default function alertReducer(state = {}, action) {
	switch(action.type) {
		case SUCCESS:
			return {
				type: 'alert-success',
				message: action.message
			};
		case ERROR:
			return {
				type: 'alert-error',
				message: action.message
			};
		case CLEAR:
			return {};
		default:
			return state;
	}
}