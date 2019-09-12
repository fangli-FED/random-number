/**
 * @file root reducer
 * @author atom-yang
 */
import { combineReducers } from 'redux';

import { randomList } from './randomListInfo';

export const rootReducer = combineReducers({
  randomList,
});
