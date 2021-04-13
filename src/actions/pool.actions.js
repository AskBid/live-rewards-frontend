import { 
	REQUEST_POOL_TICKERS,
	REQUEST_POOL_TICKERS_SUCCESS,
	ERROR,
	CLEAR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const getTickers = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_POOL_TICKERS})
		return fetch(`http://localhost:3001/pools/tickers`, {
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
			})
			.catch(err => {
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}

export const addUserPoolHash = (username, ticker) => {
	return (dispatch) => {
		dispatch({type: REQUEST_POOL_TICKERS})
		return fetch(`http://localhost:3001//users/:user_username/user_pool_hashes`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify({
	    	username,
	    	ticker
	    })
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
			})
			.catch(err => {
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}