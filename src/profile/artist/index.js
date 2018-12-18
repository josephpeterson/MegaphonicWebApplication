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


var tabs = [
  { component: TabFeed, path: "feed", title: "Feed" },
  { component: TabAbout, path: "about", title: "About" },
  { component: TabMusic, path: "music", title: "Music" },
  { component: TabLive, path: "live", title: "Live" },
  { component: TabEvents, path: "events", title: "Events" }
];

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
    }).done(user => {
      this.setState({
        loaded: true,
        ProfileUser: user
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
    const { error, loaded, ProfileUser } = this.state;
    var history = this.props.history;

    var prefix = this.props.match.url;
    if (prefix.substring(prefix.length - 1, prefix.length) != "/")
      prefix += "/";

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

    var headerSrc = ProfileUser.headerPicture;
    if (!headerSrc)
      headerSrc = "/img/header_default.jpg";
    var profilePictureSrc = ProfileUser.profilePicture;
    if (!profilePictureSrc)
      profilePictureSrc = "/img/profile_default.jpg";

    return (
      <div className="">
        <Switch>
          <Route path={prefix + "manage"}>
            <ArtistManagePage ProfileUser={ProfileUser} {...this.props} />
          </Route>
          <Route>
            <div>
              <ProfileHeader src={headerSrc}>
                <Portrait Editable={false} src={profilePictureSrc} {...this.props} />
                <ProfileHeaderInfo history={this.props.history} Relationship={ProfileUser.relationship} ProfileUser={ProfileUser}/>
              </ProfileHeader>
              <ProfileNavigationBar Prefix={prefix} Tabs={tabs} Me={false} history={history} ProfileUser={ProfileUser} path={this.props.location.pathname} {...this.props} />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}
export default ArtistProfile;