// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

//Components
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import Player from './components/player';
import Watermark from './components/watermark';
import ErrorNotFound from './components/error/ErrorNotFound';

import Home from './pages/home';
import MegaProfile from './profile/user';
import ArtistProfile from './profile/artist';
import MyCalendar from './pages/calendar';
import ExplorePage from './pages/explore';
import CreateArtistForm from './create/artist';

import BasicModal from './components/BasicModal';
import mApi from './services/MegaphonicAPI';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: {
        show: false,
        title: "Modal Title",
        body: "Modal body"
      }
    }
    mApi.showDialog = this.showModal.bind(this);
  }
  render() {
    var auth = this.props.auth;
    var user = this.props.MegaUser;

    var modal = this.state.modal;

  
    return (
      <Route path="/" render={(props) => {
        props.MegaUser = user;
        props.auth = auth;
        return (
          <div className="container megaContainer">
            <Topbar {...props} />
            <Switch>
              <Route exact path="/" render={(props) => <Home MegaUser={user} auth={auth} {...props} />} />
              <Route path="/a/:id?" render={(props) => <ArtistProfile auth={auth} MegaUser={user} {...props} />} />
              <Route path="/p/:id?" render={(props) => <MegaProfile auth={auth} MegaUser={user} {...props} />} />
              <Route path="/create/artist" render={(props) => <CreateArtistForm auth={auth} MegaUser={user} {...props} />} />
              <Route path="/me">
					      <Redirect to={"/p/" + user.Username}/>
              </Route>
              <Route path="/calendar" render={(props) => <MyCalendar auth={auth} {...props} />} />
              <Route path="/explore/:q?" render={(props) => <ExplorePage auth={auth} {...props} />} />
              <Route render={(props) => <ErrorNotFound {...props}/>} />
            </Switch>
              <BasicModal {...modal}/>
            <Watermark/>
          </div>
        );
      }} />
    );
  }

  showModal(state)
  {
    this.setState({
      modal: {
        show: true,
        title: state.title,
        body: state.body
      }
    });
  }
}

export default App;
