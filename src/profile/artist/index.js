import React, { Component } from 'react';
import ProfileNavigationBar from '../components/ProfileNavigationBar';
import { Route, Router, Switch, Redirect } from 'react-router-dom';

import ProfileHeader from '../components/ProfileHeader';
import mApi from "../../services/MegaphonicAPI";
import Portrait from "../components/Portrait";
import ProfileHeaderInfo from "./ProfileHeaderInfo";


import TabAbout from '../components/TabAbout';
import TabFeed from '../components/TabFeed';

import $ from 'jquery';
import './main.css';
import TabLive from './TabLive';
import TabMusic from './TabMusic';
import TabEvents from './TabEvents';

import ArtistManagePage from "./ArtistManagePage";

class ArtistProfile extends Component {
  constructor(props) {
    super(props);
    var id = props.match.params.id;

    this.state = {
      id: id,
      loaded: false
    }
  }
  componentDidMount() {
    var id = this.state.id;
    mApi.get("api", "artist/" + id).fail(e => {
      this.showError(e.statusText);
    }).done(data => {

      var user;
      try {
        user = JSON.parse(data);
        if (!user || !user.Username)
          throw new Error("API: Invalid MegaArtist response");
      }
      catch (e) {
        this.showError(e.message)
        return;
      }
      this.setState({
        loaded: true,
        user: user
      });
    });
  }
  showError(err) {
    this.setState({
      loaded: true,
      error: err
    });
  }
  render() {
    const { error, loaded, user } = this.state;



    if (!loaded) {
      return (<div className="container p-5">
        <div className="row justify-content-center p-5">
          <img src="/img/loading.svg" />
        </div>
      </div>);
    }
    if (error) {
      return (<div className="container p-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>);
    }

    var isMe = this.props.MegaUser.AccountId == user.AccountId;

    var tabs = [
      { component: TabFeed, path: "feed", title: "Feed" },
      { component: TabAbout, path: "about", title: "About" },
      { component: TabMusic, path: "music", title: "Music" },
      { component: TabLive, path: "live", title: "Live" },
      { component: TabEvents, path: "events", title: "Events" }
    ];

    //console.log(this.props);

    var history = this.props.history;


    var prefix = this.props.match.url;
    console.log(this.props);

    return (
      <div className="">
        <Switch>
          <Route path={prefix + "/manage"}>
            <ArtistManagePage ProfileUser={user} {...this.props} />
          </Route>
          <Route>
            <div>

              <ProfileHeader Me={isMe} ProfileUser={user} {...this.props}>
                <Portrait Me={isMe} MegaUser={this.props.MegaUser} ProfileUser={user} />
                <ProfileHeaderInfo Me={isMe} MegaUser={this.props.MegaUser} ProfileUser={user} {...this.props} />
              </ProfileHeader>
              <ProfileNavigationBar Tabs={tabs} Me={isMe} history={history} ProfileUser={user} path={this.props.location.pathname} {...this.props} />
            </div>
          </Route>

        </Switch>

      </div>
    );
  }
}
export default ArtistProfile;