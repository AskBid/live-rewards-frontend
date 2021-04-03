import { 
	REQUEST_USER_STAKES,
	REQUEST_USER_STAKES_SUCCESS,
	REQUEST_USER_STAKES_FAILURE,
	SUCCESS
} from '.'

export const userStakeAddresses = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_STAKES})
		return fetch(`http://localhost:3001/users/:user_id/stake_addresses`, {
	  	method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => res.json())
	  	.then(json => { 
	  		debugger
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
				debugger
				dispatch({type: REQUEST_USER_STAKES_FAILURE, errors: err})
			})
	}
}