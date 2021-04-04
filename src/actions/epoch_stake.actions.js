import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE
} from '.'

export const userEpochStakes = (username) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetch(`http://localhost:3001/users/${username}/epoch_stake`, {
	  	method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => res.json())
	  	.then(json => { 
	  		dispatch({
	  			type: REQUEST_USER_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_EPOCH_STAKES_FAILURE, errors: err})
			})
	}
}