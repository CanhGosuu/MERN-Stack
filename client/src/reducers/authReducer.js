// import { TEST_DISPATCH } from "../actions/actionTypes";
const initialState = {
  isAuthenticated: false,
  user: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    // case TEST_DISPATCH:
    //   return { ...state, isAuthenticated: false, user: payload };

    default:
      return state;
  }
};
