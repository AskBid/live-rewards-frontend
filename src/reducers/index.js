import { 
	REGISTER_REQUEST, 
	REGISTER_SUCCESS, 
	REGISTER_FAILURE 
} from '../actions'

const initialState = {
  user: [],
  errors: {},
  alerts: {}
};

export default function initialReducer(state = initialState, action) {
  switch (action.type) {

  	case REGISTER_REQUEST:
  		return { 
  			...state,
  			registering: true 
  		}

  	case REGISTER_SUCCESS:
  		return {
  			...state,
  			registering: false,
  			...action.message
  		}

  	case REGISTER_FAILURE:
  		// const errors = action.errors
  		return { ...state }

    default:
      return state;
  }
}
