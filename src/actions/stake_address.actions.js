import { 
  ADD_USER_STAKE_REQUEST,
	ADD_USER_STAKE_SUCCESS,
	ADD_USER_STAKE_FAILURE,
	ERROR,
	CLEAR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const addUserStake = (user, address) => {
	return (dispatch) => {
		dispatch({type: ADD_USER_STAKE_REQUEST})
		return fetch(`http://localhost:3001/users/${user}/user_stake`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify({stake_address: address})
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: ADD_USER_STAKE_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
			})
			.catch(err => {
				dispatch({type: ADD_USER_STAKE_FAILURE})
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}



