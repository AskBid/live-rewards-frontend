import { 
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  REQUEST_PRICE,
  REQUEST_PRICE_SUCCESS,
  REQUEST_PRICE_FAILURE,
  LOGOUT
} from '../actions'

let user = JSON.parse(localStorage.getItem('user'));
user = user ? user.username : undefined;

const initialState = {
  submitting: false,
  user,
  currency: {ada: 1}
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

    case REQUEST_PRICE:
      return {}

    case REQUEST_PRICE_SUCCESS:
      return {}

    case REQUEST_PRICE_FAILURE:
      return {}

    default:
      return state;
  }
}
