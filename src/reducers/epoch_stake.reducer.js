import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE
} from '../actions'

const initialState = {
  loading: false,
  epoch_stakes: []
};

export default function epochStakeReducer(state = initialState, action) {
  switch (action.type) {

  	case REQUEST_USER_EPOCH_STAKES:
  		return {
        ...state,
        loading: true
  		}

  	case REQUEST_USER_EPOCH_STAKES_SUCCESS:
  		return {
  			...state,
        loading: false,
        epoch_stakes: action.payload
  		}

  	case REQUEST_USER_EPOCH_STAKES_FAILURE:
  		return { 
        ...state,
        loading: false
      }

    default:
      return state;
  }
}
