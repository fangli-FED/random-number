import { USER_INFO_STORE } from '../actions/useInfo';

const initialState = {
  userInfo: {}
};

export const userInfo = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_INFO_STORE.SET_USER_INFO:
      return {
        userInfo: payload
      };
    case USER_INFO_STORE.GET_USER_INFO:
      return state.userInfo;
    case USER_INFO_STORE.CLEAR_USER_INFO:
      return {
        userInfo: {}
      };
    default:
      return state;
  }
};
