import {
	REQUEST_POOL_TICKERS_SUCCESS
} from '../actions'

export default function poolReducer(state = {}, action) {
	switch(action.type) {

		case REQUEST_POOL_TICKERS_SUCCESS:
			return {
				tickers: action.payload
			}

		case REQUEST_POOL_PERFORMANCES:
			return {
				...state,
				loading: true
			}

		case REQUEST_POOL_PERFORMANCES_SUCCESS:
			return {
				...state,
				pools_performances: action.payload,
				loading: false
			}

		case REQUEST_POOL_PERFORMANCES_FAILURE:
			return {
				...state,
				loading: false
			}

		default:
			return state;
	}
}