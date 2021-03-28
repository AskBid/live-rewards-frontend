import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';
import sessionReducer from './alert.reducer';

export default combineReducers({
  users: userReducer,
  sessions: sessionReducer,
  alert: alertReducer
})
