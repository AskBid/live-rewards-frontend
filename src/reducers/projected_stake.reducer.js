import { 
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_SUCCESS,
  REQUEST_USER_POOL_HASHES_EPOCH_STAKES_FAILURE
} from '../actions'

const initialState = {
  loading: false,
  list: []
};

export default function projectedStakeReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}
