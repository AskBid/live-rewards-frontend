import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE,
  ADD_USER_STAKE_REQUEST,
	ADD_USER_STAKE_REQUEST_SUCCESS,
	ADD_USER_STAKE_REQUEST_FAILURE
} from '.'
import { authHeader } from '../helpers/auth-header'

export const userEpochStakes = (username) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetch(`http://localhost:3001/users/${username}/epoch_stake`, {
	  	method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => {
				if (res.ok) {
					return res.json()
				} else {
					return res.json.then(json => Promise.reject())
				}
			})
	  	.then(json => { 
	  		dispatch({
	  			type: REQUEST_USER_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_EPOCH_STAKES_FAILURE})
			})
	}
}

export const addUserStake = (user, address) => {
	return (dispatch) => {
		dispatch({type: ADD_USER_STAKE_REQUEST})
		return fetch(`http://localhost:3001/users/${user}/user_stake`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify(address)
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject())
			}
			})
			.then(json => {
				dispatch({
	  			type: ADD_USER_STAKE_REQUEST_SUCCESS,
	  			payload: json
	  		});
			})
			.catch(err => {
				dispatch({type: ADD_USER_STAKE_REQUEST_FAILURE})
			})
	}
}




