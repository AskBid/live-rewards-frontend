import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE,
	REQUEST_EPOCH_STAKE,
	REQUEST_EPOCH_STAKE_SUCCESS,
	REQUEST_EPOCH_STAKE_FAILURE,
	CLEAR_EPOCH_STAKES,
	CLEAR,
	ERROR
} from '.'
import { authHeader } from '../helpers/auth-header'

export const userEpochStakes = (username) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetch(`https://${process.env.REACT_APP_API_URL}/users/${username}/epoch_stakes`, {
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
	  		dispatch({
	  			type: REQUEST_USER_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_EPOCH_STAKES_FAILURE})
			})
	}
}

export const getEpochStake = (epoch_stake_id) => {
	return (dispatch) => {
		dispatch({type: REQUEST_EPOCH_STAKE})
		return fetch(`http://${process.env.REACT_APP_API_URL}/epoch_stakes/${epoch_stake_id}`, {
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
	  		dispatch({
	  			type: REQUEST_EPOCH_STAKE_SUCCESS, 
	  			payload: json
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_EPOCH_STAKE_FAILURE})
			})
	}
}

export const unregisteredEpochStakes = (stake_address) => {
	return (dispatch) => {
		stake_address = stake_address === '' ? 'random' : stake_address;
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetch(`http://${process.env.REACT_APP_API_URL}/stake_addresses/${stake_address}/epoch_stakes`, {
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
	  		dispatch({type: CLEAR_EPOCH_STAKES})
	  		dispatch({
	  			type: REQUEST_USER_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_EPOCH_STAKES_FAILURE})
				dispatch({type: ERROR, message: 'Address was not found.'})
			})
	}
}

