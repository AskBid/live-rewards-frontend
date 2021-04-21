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
		return fetch(`https://${process.env.REACT_APP_API_URL}/users`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => {
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
				dispatch({
	  			type: REGISTER_REQUEST_FAILURE,
	  			errors: errors
	  		});
	  		return Promise.reject()
			})
	}
}