import {
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_POST
} from '../actions/actionTypes';
// import { stat } from 'fs';
const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts]
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload) // không cần phải reload lại trang vì nó chỉ thay đổi state posts
      };

    default:
      return state;
  }
};
