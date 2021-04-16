import { 
	REGISTER_REQUEST, 
	REGISTER_REQUEST_SUCCESS, 
	REGISTER_REQUEST_FAILURE,
	SUCCESS,
	ERROR
} from '.'

export const register = (formData) => {
	return (dispatch) => {
		dispatch({type: REGISTER_REQUEST})
		return fetch(`http://localhost:3001/users`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => {
	  		debugger
	  		if (res.ok) {
					return res.json()
				} else {
					return res.json().then(json => Promise.reject(json.errors))
				}
			})
	  	.then(json => { 
	  		dispatch({
	  			type: REGISTER_REQUEST_SUCCESS
	  		});
	  		dispatch({
	  			type: SUCCESS, 
	  			message: json.alert
	  		})
	  	})
			.catch(errors => {
				debugger
				dispatch({
	  			type: REGISTER_REQUEST_FAILURE,
	  			errors: errors
	  		});
				// dispatch({type: ERROR, message: err})
			})
	}
}