import { 
  REQUEST_USER_EPOCH_STAKES,
  REQUEST_USER_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_EPOCH_STAKES_FAILURE,
  ADD_USER_STAKE_REQUEST,
  ADD_USER_STAKE_SUCCESS,
  ADD_USER_STAKE_FAILURE,
  DELETE_USER_STAKE_REQUEST,
  DELETE_USER_STAKE_SUCCESS,
  DELETE_USER_STAKE_FAILURE,
  REQUEST_EPOCH_STAKE,
  REQUEST_EPOCH_STAKE_SUCCESS,
  REQUEST_EPOCH_STAKE_FAILURE,
  CLEAR_EPOCH_STAKES,
  RECORD_LAST_UPDATE,
  REQUEST_STORAGE_NOUSER__EPOCH_STAKES_SUCCESS,
  ZERO_EMPTY_STAKES
} from '../actions'

import { current_epoch } from '../helpers/epoch_helpers'

const epochno = current_epoch();
const initialListGuess = [
  {epoch_no: epochno, epoch_info: {current_epoch: epochno}},
  {epoch_no: epochno - 1, epoch_info: {current_epoch: epochno}},
  {epoch_no: epochno - 2, epoch_info: {current_epoch: epochno}}
];

const initialState = {
  loading: false,
  list: initialListGuess,
  last_update: {},
  epoch_stake: {epoch_no: epochno, epoch_info: {current_epoch: epochno}}
};

export default function epochStakeReducer(state = initialState, action) {
  switch (action.type) {

  	case REQUEST_USER_EPOCH_STAKES:
  		return {
        ...state,
        loading: true
  		}
  	case REQUEST_USER_EPOCH_STAKES_SUCCESS:
  		return {
  			...state,
        loading: false,
        list: action.payload
  		}
  	case REQUEST_USER_EPOCH_STAKES_FAILURE:
  		return { 
        ...state,
        loading: false
      }

    case ADD_USER_STAKE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_USER_STAKE_SUCCESS:
      const filtered_list = state.list.filter(epoch_stake => epoch_stake.id)
      //filters out dummy epoch stakes
      return {
        ...state,
        loading: false,
        list: [...filtered_list, ...action.payload]
      }
    case ADD_USER_STAKE_FAILURE:
      return { 
        ...state,
        loading: false
      }

    case DELETE_USER_STAKE_REQUEST:
      return {
        ...state,
        deleting_addr_id: action.payload.addr_id
      }
    case DELETE_USER_STAKE_SUCCESS:
      const list = state.list.filter((epoch_stake) => {
        return epoch_stake.stake_address.id != action.payload
      })
      return {
        ...state,
        deleting_addr_id: undefined,
        list
      }
    case DELETE_USER_STAKE_FAILURE:
      return {
        ...state,
        deleting_addr_id: undefined
      }

    case REQUEST_EPOCH_STAKE:
      return {
        ...state,
        loading: true
      }
    case REQUEST_EPOCH_STAKE_SUCCESS:
      return {
        ...state,
        loading: false,
        epoch_stake: action.payload
      }
    case REQUEST_EPOCH_STAKE_FAILURE:
      return {
        ...state,
        loading: false
      }

    case CLEAR_EPOCH_STAKES:
      return {
        ...state,
        list: initialListGuess
      }

    case ZERO_EMPTY_STAKES:
      return {
        ...state,
        list: []
      }

    case RECORD_LAST_UPDATE:
      return {
        ...state,
        last_update: action.payload
      }

    default:
      return state;
  }
}
