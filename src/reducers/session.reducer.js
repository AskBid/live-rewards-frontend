import { 
 LOGIN_REQUEST,
 LOGIN_REQUEST_SUCCESS,
 LOGIN_REQUEST_FAILURE
} from '../actions'

const initialState = {
  submitting: false,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {

  	case LOGIN_REQUEST:
  		return {
        ...state,
        submitting: true
  		}

  	case LOGIN_REQUEST_SUCCESS:
  		return {
  			...state,
        submitting: false,
        user: action.user
  		}

  	case LOGIN_REQUEST_FAILURE:
  		return { 
        ...state,
        submitting: false
      }

    default:
      return state;
  }
}
