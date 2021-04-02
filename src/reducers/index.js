import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';
import alertReducer from './alert.reducer';
import epochReducer from './epoch.reducer';

export default combineReducers({
  users: userReducer,
  sessions: sessionReducer,
  alert: alertReducer,
  epochs: epochReducer
})
