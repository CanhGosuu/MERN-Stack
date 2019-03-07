import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Store from "./store";
import "./App.css";
// --------------------------------
//set token in locals storage for whole app
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SetCurrenttUser } from "./actions/authActions";
import store from "./store";

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user is authenticated
  store.dispatch(SetCurrenttUser(decoded));
}
// --------------------------------

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
