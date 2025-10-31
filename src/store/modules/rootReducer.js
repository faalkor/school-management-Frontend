import { combineReducers } from 'redux';

import auth from './auth/slice';
import user from './user/slice';

export default combineReducers({
  auth,
  user,
});
