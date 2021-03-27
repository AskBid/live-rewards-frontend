import { 
	REGISTER_REQUEST, 
	REGISTER_SUCCESS, 
	REGISTER_FAILURE 
} from './'

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
	  			type: REGISTER_SUCCESS, 
	  			message: {alerts: {}, errors: {}, ...json}
	  		})
	  	})
			.catch(err => {
				dispatch({type: REGISTER_FAILURE, errors: err})
			})
	}
}