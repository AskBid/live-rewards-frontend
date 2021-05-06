import { 
  ADD_USER_STAKE_REQUEST,
	ADD_USER_STAKE_SUCCESS,
	ADD_USER_STAKE_FAILURE,
	DELETE_USER_STAKE_REQUEST,
	DELETE_USER_STAKE_SUCCESS,
	DELETE_USER_STAKE_FAILURE,
	ERROR,
	CLEAR,
	ZERO_EMPTY_STAKES
} from '.'
import { authHeader } from '../helpers/auth-header'
import { addAddrToLocalStorage } from '../helpers/local_storage_methods'
import { deleteAddrFromLocalStorage } from '../helpers/local_storage_methods'
import { getAddrFromLocalStorage } from '../helpers/local_storage_methods'

export const addUserStake = (user, address) => {
	const route = user ? `users/${user}/user_stakes` : 'user_stakes'
	return (dispatch) => {
		dispatch({type: ADD_USER_STAKE_REQUEST})
		return fetch(`${process.env.REACT_APP_API_URL}/${route}`, {
			method: 'POST',
	    headers: {
	    	'Content-Type': 'application/json',
	    	...authHeader()
	    },
	    body: JSON.stringify({stake_address: address})
		}).then(res => {
				if (res.ok) {
					return res.json()
				} else {
					return res.json().then(json => Promise.reject(json.error))
				}
			})
			.then(json => {
				if (!user) { 
					(getAddrFromLocalStorage().length < 1) && dispatch({type: ZERO_EMPTY_STAKES})
					addAddrToLocalStorage(json[0])
				}
				dispatch({
	  			type: ADD_USER_STAKE_SUCCESS,
	  			payload: json
	  		});
	  		dispatch({
	  			type: CLEAR
	  		});
			})
			.catch(err => {
				dispatch({type: ADD_USER_STAKE_FAILURE})
				dispatch({type: ERROR, message: err.toString()})
			})
	}
}

export const deleteStakeAddress = (user, addr_id) => {
	return (dispatch) => {
		dispatch({
			type: DELETE_USER_STAKE_REQUEST,
			payload: addr_id
		})
		
		if (user) {
			return fetchDelete(user, addr_id)
		} else {
			deleteAddrFromLocalStorage(addr_id)
			dispatch({type: DELETE_USER_STAKE_SUCCESS, payload: addr_id});
		} 

		function fetchDelete(user, addr_id) {
			return fetch(`${process.env.REACT_APP_API_URL}/users/${user}/user_stakes/${addr_id}`, {
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
			  			type: DELETE_USER_STAKE_SUCCESS,
			  			payload: json.addr_id
			  		});
			  		dispatch({
			  			type: CLEAR
			  		});
					})
					.catch(err => {
						dispatch({type: DELETE_USER_STAKE_FAILURE})
						dispatch({type: ERROR, message: err.toString()})
					})
		}
	}
}

