import { 
	REQUEST_POOL_TICKERS,
	REQUEST_POOL_TICKERS_SUCCESS,
	REQUEST_POOL_TICKERS_FAILURE,
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
			console.log('fetching tickers')
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
				dispatch({type: REQUEST_POOL_TICKERS_FAILURE})
				// dispatch({type: ERROR, message: err.toString()})
			})
	}
}