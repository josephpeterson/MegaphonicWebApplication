import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import Calendar from '../../components/calendar';
import ProfileNavigationBar from './components/ProfileNavigationBar';
import ProfileHeader from './components/ProfileHeader';
import mApi from "../../services/MegaphonicAPI";

import $ from 'jquery';
import './main.css';
import loading from '../../callback/loading.svg';

const panes = [
  { menuItem: 'Feed', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Calendar', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
  { menuItem: 'Support', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

class MegaProfile extends Component {
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
          <img src={loading} />
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

    var history = this.props.history;
    return (
      <div className="container">
        <ProfileBanner Me={isMe} MegaUser={user} />
        <ProfileNavigationBar Me={isMe} Artist={true} history={history} ProfileUser={user} path={this.props.location.pathname} {...this.props} />
      </div>
    );
  }
}


class ProfileBanner extends Component {
  render() {
    var headerSrc = this.props.MegaUser.ProfilePicture;
    if(!headerSrc)
      headerSrc = "/img/header_default.jpg";

    return (
      <div className='profileBanner' style={
        {
          backgroundImage: "url(" + headerSrc + ")"
        }
      }>
        <Portrait {...this.props} /><ProfileHeader {...this.props} />
      </div>
    );
  }
}
class Portrait extends Component {
  render() {
    var src = this.props.MegaUser.ProfilePicture;

    if(!src)
      src = "/img/profile_default.jpg";
    return (<div className='profilePortrait' style={{
      backgroundImage: "url(" + src + ")"
    }}></div>);
  }
}
export default MegaProfile;