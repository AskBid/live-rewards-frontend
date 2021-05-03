import { 
	LOGIN_REQUEST,
	LOGIN_REQUEST_SUCCESS,
	LOGIN_REQUEST_FAILURE,
	LOGOUT,
	ERROR,
	CLEAR_EPOCH_STAKES,
	REQUEST_PRICE,
	REQUEST_PRICE_SUCCESS,
	REQUEST_PRICE_FAILURE,
  REQUEST_LAST_UPDATE,
  REQUEST_LAST_UPDATE_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_LAST_UPDATE_FAILURE
} from '.'

export const getLastUpdate = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_LAST_UPDATE})
		return fetch(`${process.env.REACT_APP_API_URL}/updated`, {
	  	method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => {
				if (res.ok) {
					return res.json()
				} else {
					return res.json().then(json => Promise.reject(json))
				}
			})
	  	.then(json => {
	  		const epochno = json.block.epoch_no
	  		dispatch({
	  			type: REQUEST_USER_EPOCH_STAKES_SUCCESS, 
	  			payload: [
					  {epoch_no: epochno, epoch_info: {current_epoch: epochno}},
					  {epoch_no: epochno - 1, epoch_info: {current_epoch: epochno}},
					  {epoch_no: epochno - 2, epoch_info: {current_epoch: epochno}}
					]
	  		});
	  		dispatch({
	  			type: REQUEST_LAST_UPDATE_SUCCESS, 
	  			payload: json.block,
	  		});
	  		return json
	  	})
			.catch(err => {
				dispatch({type: REQUEST_LAST_UPDATE_FAILURE})
				return Promise.reject(`could not fetch latest DB update`)
			})
	}
}

export const login = (formData) => {
	return (dispatch) => {
		dispatch({type: LOGIN_REQUEST})
		return fetch(`${process.env.REACT_APP_API_URL}/login`, {
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
	  		localStorage.setItem('user', JSON.stringify(user));
	  		dispatch({
	  			type: LOGIN_REQUEST_SUCCESS,
	  			user: user.username
	  		})
	  		dispatch({
	  			type: CLEAR_EPOCH_STAKES
	  		})
	  		return user
	  	})
			.catch(err => {
				dispatch({type: LOGIN_REQUEST_FAILURE})
				dispatch({type: ERROR, message: err})
				return Promise.reject(err)
			})
	}
}

export const logout = () => {
	return (dispatch) => {
		localStorage.removeItem('user')
		dispatch({type: CLEAR_EPOCH_STAKES})
		dispatch({type: LOGOUT})
	}
}

export const getPrice = (symbol) => {
	return (dispatch) => {
		dispatch({type: REQUEST_PRICE})
		return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=${symbol}`, {
	  	method: 'GET',
	    headers: {
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json"
	    }
	  }).then(res => {
		  	if (res.ok) {
		  		return res.json()
		  	} else {
		  		return res.json().then(geckoRes => Promise.reject(geckoRes))
		  	}
		  })
	  	.then((json) => {
	  		dispatch({
	  			type: REQUEST_PRICE_SUCCESS,
	  			payload: {
	  				price: json.cardano[symbol],
	  				symbol
	  			}
	  		})
	  		return json.cardano
	  	})
			.catch(err => {
				dispatch({type: REQUEST_PRICE_FAILURE})
				dispatch({type: ERROR, message: err})
				return Promise.reject(err)
			})
	}
}