import { 
 LOGIN_REQUEST,
 LOGIN_REQUEST_SUCCESS,
 LOGIN_REQUEST_FAILURE,
 LOGOUT
} from '../actions'

let user = JSON.parse(localStorage.getItem('user'));
user = user ? user.username : undefined;

const initialState = {
  submitting: false,
  user
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

    case LOGOUT:
      return {}

    default:
      return state;
  }
}
