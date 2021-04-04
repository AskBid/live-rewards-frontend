import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';
import alertReducer from './alert.reducer';
import epochStakeReducer from './epoch_stake.reducer';

export default combineReducers({
  users: userReducer,
  sessions: sessionReducer,
  alert: alertReducer,
  epoch_stakes: epochStakeReducer
})
