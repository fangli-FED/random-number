export const USER_INFO_STORE = {
  SET_USER_INFO: 'SET_USER_INFO',
  GET_USER_INFO: 'GET_USER_INFO',
  CLEAR_USER_INFO: 'CLEAR_USER_INFO'
};

export const setUserInfo = params => ({
  type: USER_INFO_STORE.SET_USER_INFO,
  payload: params
});

export const getUserInfo = () => ({
  type: USER_INFO_STORE.SET_USER_INFO
});

export const clearUserInfo = () => ({
  type: USER_INFO_STORE.CLEAR_USER_INFO
});
