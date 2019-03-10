import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Store from './store';
import './App.css';
// ==============================
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddEducation from './components/add-credentials/AddEducation';
import AddExperience from './components/add-credentials/AddExperience';
//===================================
import PrivateRoute from './components/common/PrivateRoute';

// --------------------------------
//set token in locals storage for whole app
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';

//Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user is authenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expried token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login
    window.location.href = '/login';
  }
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
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
