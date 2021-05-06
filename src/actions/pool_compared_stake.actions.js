import { 
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
	REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE,
	ADD_USER_POOL_HASH,
	ADD_USER_POOL_HASH_SUCCESS,
	ADD_USER_POOL_HASH_FAILURE,
	REQUEST_USER_POOL_HASH,
	REQUEST_USER_POOL_HASH_SUCCESS,
	REQUEST_USER_POOL_HASH_FAILURE,
	DELETE_USER_POOL_HASH,
	DELETE_USER_POOL_HASH_SUCCESS,
	DELETE_USER_POOL_HASH_FAILURE,
	ERROR,
	SUCCESS,
	CLEAR,
	DELETE_LOCAL_STORAGE_POOL_HASH_SUCCESS,
	REQUEST_EPOCH_STAKE_SUCCESS
} from '.'
import { authHeader } from '../helpers/auth-header'
import { addPoolToLocalStorage } from '../helpers/local_storage_methods'
import { deletePoolFromLocalStorage } from '../helpers/local_storage_methods'
import { getPoolsFromLocalStorage } from '../helpers/local_storage_methods'

export const getComparedEpochStakesFromUser = (username, epoch_stake_id) => {
	return (dispatch) => {
		dispatch({type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES})
		return fetchComparedEpochStakes(
			`users/${username}/user_pool_hashes?epoch_stake_id=${epoch_stake_id}`, 
			dispatch
		)
	}
}

export const getComparedEpochStakesFromLocalStorage = (epoch_stake_id) => {
	return (dispatch) => {
		const pool_hash_ids = getPoolsFromLocalStorage()
		dispatch({type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES})
		return fetchComparedEpochStakes(
			`user_pool_hashes?epoch_stake_id=${epoch_stake_id}&pool_hash_ids=${pool_hash_ids}`, 
			dispatch
		)
	}
}

function fetchComparedEpochStakes(route, dispatch) {
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
	  			type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS, 
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE})
				dispatch({type: ERROR, message: err.error.toString()})
			})
}

export const addUserPoolHash = (user, ticker, epoch_stake_id) => {
	return (dispatch) => {
		dispatch({type: ADD_USER_POOL_HASH})
		return fetch(`${process.env.REACT_APP_API_URL}/${user ? `users/${user}/` : '' }user_pool_hashes?epoch_stake_id=${epoch_stake_id}`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify({ ticker })
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				!user && addPoolToLocalStorage(json[0].pool_hash.id)
				dispatch({
	  			type: ADD_USER_POOL_HASH_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  		return json
			})
			.catch(err => {
				dispatch({type: ADD_USER_POOL_HASH_FAILURE});
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}

export const deleteLocalStoragePoolHash = (pool_hash) => {
	return (dispatch) => {
		deletePoolFromLocalStorage(pool_hash.id)
		dispatch({
			type: DELETE_LOCAL_STORAGE_POOL_HASH_SUCCESS,
			payload: pool_hash.id
		});
		dispatch({
			type: CLEAR
		});
		dispatch({
			type: SUCCESS,
			message: `${pool_hash.pool.ticker} pool has been deleted from your followed pools.`
		})
  }
}

export const deleteUserPoolHash = (user, pool_hash_id) => {
	return (dispatch) => {
		dispatch({
			type: DELETE_USER_POOL_HASH,
			payload: pool_hash_id
		})
		return fetch(`${process.env.REACT_APP_API_URL}/usera/${user}/user_pool_hashes/${pool_hash_id}`, {
			method: 'DELETE',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    }
		}).then(res => {
			if (res.ok) {
				return res.json()
			} else {
				return res.json().then(json => Promise.reject(json.error))
			}
			})
			.then(json => {
				dispatch({
	  			type: DELETE_USER_POOL_HASH_SUCCESS,
	  			payload: pool_hash_id
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
	  		dispatch({
	  			type: SUCCESS,
	  			message: json.message.toString()
	  		}) 
			})
			.catch(err => {
				dispatch({type: DELETE_USER_POOL_HASH_FAILURE})
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}
