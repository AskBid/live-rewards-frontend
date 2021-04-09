import {
	REQUEST_POOL_TICKERS,
	REQUEST_POOL_TICKERS_SUCCESS
} from '../actions'

export default function poolReducer(state = {}, action) {
	switch(action.type) {

		case REQUEST_POOL_TICKERS_SUCCESS:
			return {
				tickers: action.payload
			}

		default:
			return state;
	}
}