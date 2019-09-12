export const RANDOM_LIST_INFO = {
  STORE_RANDOM_LIST_INFO: 'STORE_RANDOM_LIST_INFO'
};

export const storeRandomList = params => ({
  type: RANDOM_LIST_INFO.STORE_RANDOM_LIST_INFO,
  payload: params
});
