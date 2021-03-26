import {REGISTER_REQUEST} from './'

export const register = (formData) => {
	return (dispatch) => {
		dispatch({type: REGISTER_REQUEST})

		return fetch(`http://localhost:3001/users`, {
	  	method: 'POST',
	    headers: { 'Content-Type': 'application/json' },
	    body: JSON.stringify(formData)
	  }).then(res => {
				return res.json()
			})
			.catch(err => console.error('error catched'))
		
	}
}