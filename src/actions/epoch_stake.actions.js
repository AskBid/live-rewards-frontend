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
	ERROR,
	RECORD_LAST_UPDATE
} from '.'
import { authHeader } from '../helpers/auth-header'

export const userEpochStakes = (username) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetchEpochStakes(`users/${username}/epoch_stakes`, dispatch)
	}
}

export const noUserEpochStakes = (stake_addresses) => {
	return (dispatch) => {
		debugger
		const route = 
			stake_addresses.length === 0 ? 
			`epoch_stakes` : 
			`epoch_stakes?stake_addresses=[${[...stake_addresses]}]`;
		dispatch({type: REQUEST_USER_EPOCH_STAKES})
		return fetchEpochStakes(route, dispatch)
	}
}

function fetchEpochStakes(route, dispatch) {
	return fetch(`${process.env.REACT_APP_API_URL}/${route}`, {
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
			payload: json.epoch_stakes
		});
		dispatch({
			type: RECORD_LAST_UPDATE,
			payload: json.last_update
		})
		dispatch({
			type: CLEAR
		});
	})
	.catch(err => {
		dispatch({type: REQUEST_USER_EPOCH_STAKES_FAILURE})
		dispatch({type: ERROR, message: 'Address was not found.'})
		return Promise.reject(err)
	})
}

export const getEpochStake = (epoch_stake_id) => {
	return (dispatch) => {
		dispatch({type: REQUEST_EPOCH_STAKE})
		return fetch(`${process.env.REACT_APP_API_URL}/epoch_stakes/${epoch_stake_id}`, {
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

