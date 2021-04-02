import { 
  REQUEST_LAST_EPOCH,
  REQUEST_LAST_EPOCH_SUCCESS,
  REQUEST_LAST_EPOCH_FAILURE
} from '../actions'

const initialState = {
  current: null,
  loading: false
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {

  	case REQUEST_LAST_EPOCH:
  		return {
        ...state,
        loading: true
  		}

  	case REQUEST_LAST_EPOCH_SUCCESS:
  		return {
  			...state,
        loading: false,
        current: action.payload
  		}

  	case REQUEST_LAST_EPOCH_FAILURE:
  		return { 
        ...state,
        loading: false
      }

    default:
      return state;
  }
}
