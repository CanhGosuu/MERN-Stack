import axios from "axios";

import { GET_ERRORS } from "./actionTypes";
// This just an easier way than having to put out register uer function and then the dispath function inside of it
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("./login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
