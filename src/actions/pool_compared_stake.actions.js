import { 
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE,
	ADD_USER_POOL_HASH,
	ADD_USER_POOL_HASH_SUCCESS,
	ADD_USER_POOL_HASH_FAILURE,
	ERROR,
	CLEAR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const getPoolCompareUserEpochStakes = (username, epoch_stake_id) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES})
		return fetch(`http://localhost:3001/users/${username}/user_pool_hashes?epoch_stake_id=${epoch_stake_id}`, {
			method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => {
				if (res.ok) {
					return res.json()
				} else {
					return res.json().then(json => Promise.reject(json))
				}
			})
	  	.then(json => {
	  		dispatch({
	  			type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE})
				dispatch({type: ERROR, message: err.error.toString()})
			})
	}
}

export const addUserPoolHash = (username, ticker) => {
	return (dispatch) => {
		dispatch({type: ADD_USER_POOL_HASH})
		return fetch(`http://localhost:3001//users/${username}/user_pool_hashes`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify({ ticker })
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: ADD_USER_POOL_HASH_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
			})
			.catch(err => {
				dispatch({type: ADD_USER_POOL_HASH_FAILURE});
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}
