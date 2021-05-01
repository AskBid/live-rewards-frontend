import {
	REQUEST_POOL_TICKERS_SUCCESS,
	REQUEST_POOL_PERFORMANCES,
	REQUEST_POOL_PERFORMANCES_SUCCESS,
	REQUEST_POOL_PERFORMANCES_FAILURE
} from '../actions'

const initialState = {
  performances: [],
  pools: [],
  loading: false
};

export default function poolReducer(state = initialState, action) {
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
				performances: action.payload.pool_epochs,
				pools: action.payload.pools,
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