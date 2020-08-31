/**
 * @file root reducer
 * @author atom-yang
 */
import { combineReducers } from 'redux';

import { randomList } from './randomListInfo';
import { userInfo } from './userinfo';

export const rootReducer = combineReducers({
  randomList,
  userInfo
});
