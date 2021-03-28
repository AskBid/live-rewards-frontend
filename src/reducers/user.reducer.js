import { 
	REGISTER_REQUEST, 
	REGISTER_REQUEST_SUCCESS, 
	REGISTER_REQUEST_FAILURE 
} from '../actions'

const initialState = {
  registering: false,
  errors: {},
  alerts: {}
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
  			registering: false,
  			...action.message
  		}

  	case REGISTER_REQUEST_FAILURE:
  		// const errors = action.errors
  		return { ...state }

    default:
      return state;
  }
}
