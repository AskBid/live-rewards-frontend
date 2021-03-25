import {REGISTER_REQUEST} from './'

export const function register(user) {
	return (dispatch) => {
		fetch(`url`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(user)
  	})
  	.then(handleResponse);
	}
}