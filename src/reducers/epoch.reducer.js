import { 
  REQUEST_LAST_EPOCH,
  REQUEST_LAST_EPOCH_SUCCESS,
  REQUEST_LAST_EPOCH_FAILURE,
  ADD_EPOCH
} from '../actions'

const initialState = {
  current: null,
  loading: false,
  epochNos: []
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

    case ADD_EPOCH:
      const value = state.epochNos.find(e => e === action.payload)
      if (value) {
        return state
      } else {
        return { 
          ...state,
          epochNos: [...state.epochNos, action.payload]
        }
      } 

    default:
      return state;
  }
}
