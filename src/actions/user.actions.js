import { 
	REGISTER_REQUEST, 
	REGISTER_REQUEST_SUCCESS, 
	REGISTER_REQUEST_FAILURE,
	SUCCESS
} from '.'

export const register = (formData) => {
	return (dispatch) => {
		dispatch({type: REGISTER_REQUEST})
		return fetch(`http://localhost:3001/users`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => res.json())
	  	.then(json => { 
	  		dispatch({
	  			type: REGISTER_REQUEST_SUCCESS, 
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