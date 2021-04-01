import { 
	REQUEST_USER_STAKES,
	REQUEST_USER_STAKES_SUCCESS,
	REQUEST_USER_STAKES_FAILURE
} from '.'

export const userStakeAddresses = (user) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_STAKES})
		return fetch(`http://localhost:3001/users/:user_id/stake_addresses`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(user)
	  }).then(res => res.json())
	  	.then(json => { 
	  		dispatch({
	  			type: REQUEST_USER_STAKES_SUCCESS, 
	  			errors: {...json.errors}
	  		});
	  		dispatch({
	  			type: SUCCESS, 
	  			message: json.alert
	  		})
	  	})
			.catch(err => {
				dispatch({type: REGISTER_REQUEST_FAILURE, errors: err})
			})
	}
}