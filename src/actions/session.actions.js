import { 
	LOGIN_REQUEST,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_FAILURE,
	ERROR
} from '.'
import history from '../helpers/history';


export const login = (formData) => {
	return (dispatch) => {
		dispatch({type: LOGIN_REQUEST})
		return fetch("http://localhost:3001/login", {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => {
		  	if (res.ok) {
		  		return res.json()
		  	} else {
		  		return res.json().then(user => Promise.reject(user.errors))
		  	}
		  })
	  	.then((user) => {
	  		debugger
	  		localStorage.setItem('user', JSON.stringify(user));
	  		dispatch({
	  			type: LOGIN_REQUEST_SUCCESS
	  		})
	  		history.push('/live-rewards')
	  	})
			.catch(err => {
				dispatch({type: LOGIN_REQUEST_FAILURE})
				dispatch({type: ERROR, message: err})
				return Promise.reject()
			})
	}
}