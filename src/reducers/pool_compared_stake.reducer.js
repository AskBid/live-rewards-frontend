import { 
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE,
  ADD_USER_POOL_HASH,
  ADD_USER_POOL_HASH_SUCCESS,
  ADD_USER_POOL_HASH_FAILURE
} from '../actions'

const initialState = {
  loading: false,
  list: []
};

export default function projectedStakeReducer(state = initialState, action) {
  switch (action.type) {

  	case REQUEST_USER_POOL_HASHES_EPOCH_STAKES:
  		return {
  			...state,
  			loading: true
  		}

  	case REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS:
  		return {
  			...state,
  			loading: false,
  			list: [...action.payload]
  		}

  	case REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE:
  		return {
  			...state,
  			loading: false,
  		}

    default:
      return state;
  }
}
