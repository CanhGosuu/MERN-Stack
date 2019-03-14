import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';
export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer
});
