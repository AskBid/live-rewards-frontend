import { 
  REQUEST_DELEGATION_FLOW,
  REQUEST_DELEGATION_FLOW_SUCCESS,
  REQUEST_DELEGATION_FLOW_FAILURE,
} from '.'

export const getDelegationFlow = (epoch_no) => {
	return (dispatch) => {
		dispatch({type: REQUEST_DELEGATION_FLOW})
		return fetch(`${process.env.REACT_APP_API_URL}/epoch_delegations_flows/${epoch_no}`, {
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
	  			type: REQUEST_DELEGATION_FLOW_SUCCESS, 
	  			payload: json
	  		});
	  		return json
	  	})
			.catch(err => {
				dispatch({type: REQUEST_DELEGATION_FLOW_FAILURE})
			})
	}
}

