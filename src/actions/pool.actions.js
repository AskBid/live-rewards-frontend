import { 
	ERROR,
	CLEAR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const addUserStake = (ticker) => {
	return (dispatch) => {
		dispatch({type: })
		return fetch(`http://localhost:3001/pools/tickers`, {
			method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    },
	    body: JSON.stringify(ticker)
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: ,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
			})
			.catch(err => {
				dispatch({type: })
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}