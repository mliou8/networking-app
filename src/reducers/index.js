import { combineReducers } from 'redux';
import AuthReducer from './auth';
import UserReducer from './UserInfo';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
  user: UserReducer,
});

export default rootReducer;
