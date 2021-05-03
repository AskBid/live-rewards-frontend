import { 
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  REQUEST_PRICE,
  REQUEST_PRICE_SUCCESS,
  REQUEST_PRICE_FAILURE,
  LOGOUT,
  REQUEST_LAST_UPDATE,
  REQUEST_LAST_UPDATE_SUCCESS,
  REQUEST_LAST_UPDATE_FAILURE
} from '../actions'

let user = JSON.parse(localStorage.getItem('user'));
let noUserPools = user ? undefined : JSON.parse(localStorage.getItem('pools'));
let noUserStakeAddrs = user ? undefined : JSON.parse(localStorage.getItem('addr'));
user = user ? user.username : undefined;

const initialState = {
  submitting: false,
  noUserPools,
  noUserStakeAddrs,
  lastUpdate: {},
  user,
  currency: {price: 1, symbol: 'ada'},
  gecko_loading: false
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
      return {
        lastUpdate: state.lastUpdate,
        currency: {price: 1, symbol: 'ada'}
      }

    case REQUEST_PRICE:
      return {
        ...state,
        gecko_loading: true
      }

    case REQUEST_PRICE_SUCCESS:
      return {
        ...state,
        currency: action.payload,
        gecko_loading: false
      }

    case REQUEST_PRICE_FAILURE:
      return {
        ...state,
        gecko_loading: false
      }

    case REQUEST_LAST_UPDATE:
      return {
        ...state
      }

    case REQUEST_LAST_UPDATE_SUCCESS:
      return {
        ...state,
        lastUpdate: {...action.payload}
      }

    case REQUEST_LAST_UPDATE_FAILURE:
      return {
        ...state
      }

    default:
      return state;
  }
}
