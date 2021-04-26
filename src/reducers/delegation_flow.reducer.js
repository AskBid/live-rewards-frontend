import { 
  REQUEST_DELEGATION_FLOW,
  REQUEST_DELEGATION_FLOW_SUCCESS,
  REQUEST_DELEGATION_FLOW_FAILURE,
} from '../actions'

const initialState = {
  loading: false,
  delegation_flow: undefined 
};

export default function delegationFlow(state = initialState, action) {
  switch (action.type) {

  	case REQUEST_DELEGATION_FLOW:
  		return {
        ...state,
        loading: true
  		}

  	case REQUEST_DELEGATION_FLOW_SUCCESS:
  		return {
  			...state,
        loading: false,
        delegation_flow: action.payload
  		}

  	case REQUEST_DELEGATION_FLOW_FAILURE:
  		return { 
        ...state,
        loading: false
      }

    default:
      return state;
  }
}
