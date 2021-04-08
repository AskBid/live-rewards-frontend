import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE,
  ADD_USER_STAKE_REQUEST,
  ADD_USER_STAKE_SUCCESS,
  ADD_USER_STAKE_FAILURE,
  DELETE_USER_STAKE_REQUEST,
  DELETE_USER_STAKE_SUCCESS,
  DELETE_USER_STAKE_FAILURE
} from '../actions'

const initialState = {
  loading: false,
  deleting_addr_id: undefined,
  list: []
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
        list: action.payload
  		}

  	case REQUEST_USER_EPOCH_STAKES_FAILURE:
  		return { 
        ...state,
        loading: false
      }

    case ADD_USER_STAKE_REQUEST:
      return {
        ...state,
        loading: true
      }

    case ADD_USER_STAKE_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.payload]
      }

    case ADD_USER_STAKE_FAILURE:
      return { 
        ...state,
        loading: false
      }

    case DELETE_USER_STAKE_REQUEST:
      return {
        ...state,
        deleting_addr_id: action.payload
      }

    default:
      return state;
  }
}
