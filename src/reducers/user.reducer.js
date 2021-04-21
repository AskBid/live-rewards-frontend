import { 
	REGISTER_REQUEST, 
	REGISTER_REQUEST_SUCCESS, 
	REGISTER_REQUEST_FAILURE 
} from '../actions'

const initialState = {
  registering: false,
  errors: {}
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {

  	case REGISTER_REQUEST:
  		return { 
  			...state,
  			registering: true 
  		}

  	case REGISTER_REQUEST_SUCCESS:
  		return {
  			...state,
  			registering: false
  		}

  	case REGISTER_REQUEST_FAILURE:
  		return { 
        ...state,
        registering: false,
        errors: {...action.errors}
      }

    default:
      return state;
  }
}
