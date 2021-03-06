import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';
import alertReducer from './alert.reducer';
import epochStakeReducer from './epoch_stake.reducer';
import poolReducer from './pool.reducer';
import poolComparedStakesReducer from './pool_compared_stake.reducer';
import delegationFlow from './delegation_flow.reducer';

export default combineReducers({
  users: userReducer,
  sessions: sessionReducer,
  alert: alertReducer,
  epoch_stakes: epochStakeReducer,
  pools: poolReducer,
  pool_compared_stakes: poolComparedStakesReducer,
  delegation_flow: delegationFlow
})
