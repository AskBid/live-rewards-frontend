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
	  	.then(user => {
	  		// store user details and jwt token in local storage to keep user logged in between page refreshes
        !user.errors &&	localStorage.setItem('user', JSON.stringify(user));
	  		dispatch({
	  			type: LOGIN_REQUEST_SUCCESS,
	  			errors: user.errors ? {...user.errors} : {}
	  		})
	  		debugger
	  	})
			.catch(err => {
				dispatch({type: LOGIN_REQUEST_FAILURE, errors: err})
			})
	}
}