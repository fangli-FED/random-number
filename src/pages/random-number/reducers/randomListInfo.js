import { RANDOM_LIST_INFO } from '../actions/randomListInfo';

const initialState = {
  list: []
};

export const randomList = (state = initialState, { type, payload }) => {
  switch (type) {
    case RANDOM_LIST_INFO.STORE_RANDOM_LIST_INFO:
      return {
        list: payload
      };
    default:
      return state;
  }
};
