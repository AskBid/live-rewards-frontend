import { 
	LOGIN_REQUEST,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_FAILURE
} from './'

export const login = (formData) => {
	return (dispatch) => {
		dispatch({type: LOGIN_REQUEST})
		return fetch(`http://localhost:3001/login`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => res.json())
	  	.then(json => {
	  		debugger
	  		dispatch({
	  			type: LOGIN_REQUEST_SUCCESS, 
	  			credentials: null
	  		})
	  	})
			.catch(err => {
				dispatch({type: LOGIN_REQUEST_FAILURE, errors: err})
			})
	}
}