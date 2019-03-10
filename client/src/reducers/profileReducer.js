import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    default:
      return state;
  }
};
