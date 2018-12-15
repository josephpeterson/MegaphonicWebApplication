// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

//Components
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Player from './components/player';
import Watermark from './components/watermark';

import Home from './pages/home';
import Artist from './pages/artist';
import Settings from './pages/settings';
import MegaProfile from './pages/profile';
import MyCalendar from './pages/calendar';
import ExplorePage from './pages/explore';

class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    var auth = this.props.auth;
    var user = this.props.MegaUser;
    return (
      <Route path="/" render={(props) => {
        props.MegaUser = user;
        props.auth = auth;
        return (
          <div className="container">
            <Topbar {...props} />
            <Switch>
              <Route path="/artist" render={(props) => <Artist auth={auth} {...props} />} />
              <Route path="/settings" render={(props) => <Settings auth={auth} {...props} />} />
              <Route path="/me" render={(props) => <MegaProfile auth={auth} MegaUser={user} {...props} />} />
              <Route path="/calendar" render={(props) => <MyCalendar auth={auth} {...props} />} />
              <Route path="/explore/:q" render={(props) => <ExplorePage auth={auth} {...props} />} />
              <Route render={(props) => <Home MegaUser={user} auth={auth} {...props} />} />
            </Switch>
            <Player />
            <Watermark />
          </div>
        );
      }} />
    );
  }
}

export default App;
