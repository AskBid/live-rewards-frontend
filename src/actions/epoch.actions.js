import { 
	REQUEST_LAST_EPOCH,
	REQUEST_LAST_EPOCH_SUCCESS,
	REQUEST_LAST_EPOCH_FAILURE
} from '.'

export const currentEpoch = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_LAST_EPOCH})
		return fetch(`http://localhost:3001/epochs/0`, {
	  	method: 'GET',
	    headers: { 
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json" 
	    },
	  }).then(res => res.json())
	  	.then(json => { 
	  		dispatch({
	  			type: REQUEST_LAST_EPOCH_SUCCESS, 
	  			errors: {...json.errors}
	  		});
	  		dispatch({
	  			type: SUCCESS, 
	  			message: json.alert
	  		})
	  	})
			.catch(err => {
				dispatch({type: REQUEST_LAST_EPOCH_FAILURE, errors: err})
			})
	}
}