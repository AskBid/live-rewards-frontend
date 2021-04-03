import { 
	REQUEST_LAST_EPOCH,
	REQUEST_LAST_EPOCH_SUCCESS,
	REQUEST_LAST_EPOCH_FAILURE
} from '.'

export const currentEpoch = () => {
	return (dispatch) => {
		dispatch({type: REQUEST_LAST_EPOCH})
		return fetch(`http://localhost:3001/blocks/0`, {
	  	method: 'GET',
	    headers: { 
	    	'Content-Type': 'application/json',
	    	"Accept": "application/json" 
	    },
	  }).then(res => res ? res.json() : Promise.reject())
	  	.then(epochno => {
	  		dispatch({
	  			type: REQUEST_LAST_EPOCH_SUCCESS, 
	  			payload: epochno
	  		});
	  	})
			.catch(err => {
				dispatch({type: REQUEST_LAST_EPOCH_FAILURE})
			})
	}
}

// export const addEpoch = (number) => {
// 	return (dispatch) => {
// 		dispatch({type: ADD_EPOCH, payload: number})
// 	}
// }