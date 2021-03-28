import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import sessionReducer from './session.reducer';

export default combineReducers({
  users: userReducer,
  sessions: sessionReducer
})
