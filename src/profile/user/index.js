import React, { Component } from 'react';
import ProfileNavigationBar from '../components/ProfileNavigationBar';
import ProfileHeader from '../components/ProfileHeader';
import mApi from "../../services/MegaphonicAPI";
import Portrait from "../components/Portrait";
import ProfileHeaderInfo from "./ProfileHeaderInfo";
import PhotoIcon from '../photo.png';

import TabEdit from './TabEdit';
import TabAbout from '../components/TabAbout';
import TabFeed from '../components/TabFeed';
import TabFollowing from './TabFollowing';
import TabPlaylists from './TabPlaylists';

import $ from 'jquery';
import './main.css';


class MegaProfile extends Component {
  constructor(props) {
    super(props);
    var id = props.match.params.id;
    this.state = {
      id: id,
      MegaUser: undefined,
      loaded: false
    }
  }
  componentDidMount() {
    var id = this.state.id;
    this.setState({
      loaded: false
    });
    this.loadProfile(id);
  }
  loadProfile(id) {
    mApi.get("api", "user?Username=" + id).fail(e => {
      this.showError(e.statusText);
    }).done(user => {
      this.setState({
        loaded: true,
        ProfileUser: user
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    //Reload profile if id is different
    var id2 = nextProps.match.params.id;
    var id1 = this.props.match.params.id;
    if (id1 != id2) {
      this.setState({
        loaded: false
      });
      var id = nextProps.match.params.id;
      this.loadProfile(id);
    }
  }
  showError(err) {
    this.setState({
      loaded: true,
      error: err
    });
  }
  render() {
    const { error, loaded, ProfileUser } = this.state;

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
    var MegaUser = this.props.MegaUser;
    var Me = ProfileUser.accountId == MegaUser.accountId;
    var followerCount = ProfileUser.following;
    var playlistCount = ProfileUser.playlists;
    var headerSrc = ProfileUser.headerPicture;
    if (!headerSrc)
      headerSrc = "/img/header_default.jpg";
    var profilePictureSrc = ProfileUser.profilePicture;
    if (!profilePictureSrc)
      profilePictureSrc = "/img/profile_default.jpg";
    
    var history = this.props.history;
    var prefix = this.props.match.url;
    if (prefix.substring(prefix.length - 1, prefix.length) != "/")
      prefix += "/";

    var tabs = [
      { component: TabFeed, path: "feed", title: "Feed" },
      { component: TabAbout, path: "about", title: "About" },
      { component: TabPlaylists, path: "playlists", title: `Playlists (${playlistCount})` },
      { component: TabFollowing, path: "following", title: `Following (${followerCount})` }
    ];
    if (Me) {
      tabs.push({ component: TabEdit, path: "edit", title: "Edit Profile" });
    }
    return (
      <div className="">
        <ProfileHeader src={headerSrc}>
          <Portrait Editable={Me} src={profilePictureSrc} {...this.props} />
          <ProfileHeaderInfo Me={false} MegaUser={this.props.MegaUser} ProfileUser={ProfileUser} {...this.props} />
        </ProfileHeader>
        <ProfileNavigationBar Prefix={prefix} Tabs={tabs} Me={false} history={history} ProfileUser={ProfileUser} path={this.props.location.pathname} {...this.props} />
      </div>
    );
  }
}
export default MegaProfile;