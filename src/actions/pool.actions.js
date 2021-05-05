import { 
	REQUEST_POOL_TICKERS,
	REQUEST_POOL_TICKERS_SUCCESS,
	REQUEST_POOL_PERFORMANCES,
	REQUEST_POOL_PERFORMANCES_SUCCESS,
	REQUEST_POOL_PERFORMANCES_FAILURE,
	ERROR,
	CLEAR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const getTickers = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_POOL_TICKERS})
		return fetch(`${process.env.REACT_APP_API_URL}/pools/tickers`, {
			method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: REQUEST_POOL_TICKERS_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  		return json
			})
			.catch(err => {
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}

export const getPoolPerformances = (minimum_blocks) => {
	return (dispatch) => {
		dispatch({type: REQUEST_POOL_PERFORMANCES})
		return fetch(`${process.env.REACT_APP_API_URL}/pools?minimum_blocks=${minimum_blocks}`, {
			method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: REQUEST_POOL_PERFORMANCES_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
			})
			.catch(err => {
				dispatch({type: REQUEST_POOL_PERFORMANCES_FAILURE})
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}

