import { 
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE,
  ADD_USER_POOL_HASH,
  ADD_USER_POOL_HASH_SUCCESS,
  ADD_USER_POOL_HASH_FAILURE,
  REQUEST_USER_POOL_HASH,
  REQUEST_USER_POOL_HASH_SUCCESS,
  REQUEST_USER_POOL_HASH_FAILURE,
  DELETE_USER_POOL_HASH,
  DELETE_USER_POOL_HASH_SUCCESS,
  DELETE_USER_POOL_HASH_FAILURE
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

    case ADD_USER_POOL_HASH:
      return {
        ...state,
        loading: true
      }

    case ADD_USER_POOL_HASH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, ...action.payload]
      }

    case ADD_USER_POOL_HASH_FAILURE:
      return {
        ...state,
        loading: false,
      }

    // case REQUEST_USER_POOL_HASH:
    //   return {
    //     ...state,
    //     loading: true
    //   }

    // case REQUEST_USER_POOL_HASH_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     list: [...state.list, ...action.payload]
    //   }

    // case REQUEST_USER_POOL_HASH_FAILURE:
    //   return {
    //     ...state,
    //     loading: false
    //   }

    case DELETE_USER_POOL_HASH:
      return {
        ...state,
        deleting_user_pool_hash_id: action.payload
      }

    case DELETE_USER_POOL_HASH_SUCCESS:
      const list = state.list.filter(compared_stake => {
        return compared_stake.user_pool_hash_id != action.payload
      })
      return {
        ...state,
        deleting_user_pool_hash_id: undefined,
        list
      }

    case DELETE_USER_POOL_HASH_FAILURE:
      return {
        ...state,
        deleting_user_pool_hash_id: undefined
      }

    default:
      return state;
  }
}
