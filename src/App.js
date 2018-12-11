// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

//Components
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Player from './components/player';

import Home from './pages/home';
import Artist from './pages/artist';
import Settings from './pages/settings';
import MeProfile from './pages/me';
import MyCalendar from './pages/calendar';
import ExplorePage from './pages/explore';
import LoginPage from './pages/login';
import LandingPage from './pages/landing';

//Authentication
//History (todo: remove this one day)
import createHistory from 'history/createBrowserHistory';
import Auth from './Auth';
import Auth0Callback from './auth/Auth0';
var history = createHistory();

const auth = new Auth();

const handleAuthentication = ({ location }) => {

  //Check if we have a token
  //?t=TOKEN
  var token = location.search.substring(3);
  if(token)
    auth.handleAuthentication(token);
}


class App extends Component {
  render() {
    var Authenticated = auth.isAuthenticated();
    return (
      <Router history={history}>
        <div className="App">
          {!Authenticated && (
              <Switch>
                <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <Auth0Callback {...props} />
                }} />
                <Route path="/login" render={(props) => {
                  auth.login();
                  return(<div></div>);
                }}/>
                <Route render={(props) => <LandingPage auth={auth} {...props} />} />
              </Switch>
          )}
          {Authenticated && (
            <div className="container" style={{
              "margin-bottom": "160px"
            }}>
              <Route path="/" render={(props) => <Topbar auth={auth} {...props} />} />
              <Switch>
                <Route path="/artist" render={(props) => <Artist auth={auth} {...props} />} />
                <Route path="/settings" render={(props) => <Settings auth={auth} {...props} />} />
                <Route path="/me" render={(props) => <MeProfile auth={auth} {...props} />} />
                <Route path="/calendar" render={(props) => <MyCalendar auth={auth} {...props} />} />
                <Route path="/explore" render={(props) => <ExplorePage auth={auth} {...props} />} />
                <Route render={(props) => <Home auth={auth} {...props} />} />
              </Switch>
              <Player />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
