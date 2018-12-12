import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import Calendar from '../../components/calendar';
import ProfileNavigationBar from './components/ProfileNavigationBar';
import ProfileHeader from './components/ProfileHeader';

import $ from 'jquery';
import './main.css';

const panes = [
  { menuItem: 'Feed', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Calendar', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
  { menuItem: 'Support', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

class MegaProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var user = this.props.MegaUser;
    var history = this.props.history;
    return (
      <div className="container">
        <ProfileBanner Me={true} MegaUser={user} />
        <ProfileNavigationBar Me={true} Artist={true} history={history} MegaUser={user} path={this.props.location.pathname} />
      </div>
    );
  }
}


class ProfileBanner extends Component {
  render() {
    return (
      <div className='profileBanner' style={
        {
          backgroundImage: "url(" + this.props.MegaUser.HeaderPicture + ")"
        }
      }>
        <Portrait {...this.props} /><ProfileHeader {...this.props} />
      </div>
    );
  }
}
class Portrait extends Component {
  render() {
    return (<div className='profilePortrait' style={{
      backgroundImage: "url(" + this.props.MegaUser.ProfilePicture + ")"
    }}></div>);
  }
}
export default MegaProfile;