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
  loadProfile(id)
  {
    mApi.get("api", "user?Username=" + id).fail(e => {
      this.showError(e.statusText);
    }).done(data => {

      var user;
      try {
        user = JSON.parse(data);
        if (!user || !user.Username)
          throw new Error("API: Invalid MegaAccount response");
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
  componentWillReceiveProps(nextProps){
    //Reload profile if id is different
    var id2 = nextProps.match.params.id;
    var id1 = this.props.match.params.id;
    if(id1 != id2)
    {
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

    var followerCount = user.Following;
    var playlistCount = user.Playlists;

    var tabs = [
      { component: TabFeed, path: "feed", title: "Feed" },
      { component: TabAbout, path: "about", title: "About" },
      { component: TabPlaylists, path: "playlists", title: `Playlists (${playlistCount})` },
      { component: TabFollowing, path: "following", title: `Following (${followerCount})` }
    ];
    var editable;
    if (isMe) {
      tabs.push({ component: TabEdit, path: "edit", title: "Edit Profile" });
      editable = (<div className="profilePictureChange">
        <img src={PhotoIcon} />
        <label>Change picture</label>
      </div>);

    }

    var history = this.props.history;
    return (
      <div className="">
        <ProfileHeader Me={isMe} ProfileUser={user} {...this.props}>
          <Portrait Me={isMe} MegaUser={this.props.MegaUser} ProfileUser={user}/>
          <ProfileHeaderInfo Me={isMe} MegaUser={this.props.MegaUser} ProfileUser={user} {...this.props}/>
          {editable}
        </ProfileHeader>
        <ProfileNavigationBar Tabs={tabs} Me={isMe} history={history} ProfileUser={user} path={this.props.location.pathname} {...this.props} />
      </div>
    );
  }
}
export default MegaProfile;