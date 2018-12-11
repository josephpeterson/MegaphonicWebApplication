import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import Calendar from '../../components/calendar';
import { Route, Router, Switch } from 'react-router-dom';
import { Link,Redirect } from 'react-router-dom';
import Gear from './gear.png';

import TabMusic from './artist/TabMusic';
import TabLive from './artist/TabMusic';
import TabEdit from './edit';

import $ from 'jquery';
import './main.css';

const panes = [
  { menuItem: 'Feed', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Calendar', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
  { menuItem: 'Support', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const MyProfile = true;
const ArtistProfile = true;
const MegaUser = {
  FirstName: "Joseph",
  LastName: "Peterson",
  Email: "josephpetersonn@gmail.com",
  Username: "josephpetersonn",
  CityName: "Milwaukee",
  StateName: "Wisconsin",
  StateCode: "WI",

  Followers: 10,
  Following: 2,
  Playlists: 3,
  ProfilePicture: "https://scontent-ort2-2.xx.fbcdn.net/v/t31.0-8/16797673_10208209087725960_2664634649943939752_o.jpg?_nc_cat=110&_nc_ht=scontent-ort2-2.xx&oh=4cc6fca8618a637ec660ba25731cf161&oe=5CAEF065",
  HeaderPicture: "https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/12190099_10205091453227046_4962877471085643424_n.jpg?_nc_cat=102&_nc_ht=scontent-ort2-2.xx&oh=abaf59b5503a36a1a48fd1e361ede9c0&oe=5C99EB96"
}

class MeProfile extends Component {
  constructor() {
    super();
    this.profile = MegaUser;
  }
  render() {
    var User = this.profile;
    return (
      <div className="container">
        <ProfileBanner />
        <NavigationBar path={this.props.location.pathname}/>
      </div>
    );
  }
}

class NavigationBar extends Component {
  constructor() {
    super();
    var tabs = [
      { component: TabAbout, path:"", title: "About" },
      { component: TabMusic, path: "music", title: "Music", artistOnly: true },
      { component: TabLive, path: "live", title: "Live", artistOnly: true },
      { component: TabPlaylists, path: "playlists", title: "Playlists" },
      { component: TabFollowing, path: "following", title: "Following" },
      { component: TabEdit, path: "edit", title: "" }
    ]
    this.tabs = tabs;
  }
  render() {
    var tabs = this.tabs;

    var activeTab = tabs.find(t => "/me/" + t.path == this.props.path);
    if(!activeTab)
      activeTab = tabs[0];

    return (<div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          {tabs.map((tab, i) => {
            if(!tab.title || (!ArtistProfile && tab.artistOnly))
              return;
            return (<li key={i} className="nav-item">
              <Link to={"/me/" + tab.path} className={"nav-link " + (activeTab == tab ? "active" : "")}>{tab.title}</Link>
            </li>)
          }
          )}
        </ul>
      </div>
      <div className="container p-3 mt-3">
        <Switch>
          {tabs.map((tab,i) =>
            (<Route key={i} exact path={"/me/" + tab.path} component={tab.component}/>)
          )}
          <Redirect to="/me/"/>
        </Switch>
      </div>
    </div>);
  }
}
class ProfileBanner extends Component {
  render() {
    return (<div className='profileBanner' style={{
      "background-image": "url(" + MegaUser.HeaderPicture + ")"
    }}><Portrait /><Header /></div>);
  }
}
class Portrait extends Component {
  render() {
    return (<div className='profilePortrait' style={{
      "background-image": "url(" + MegaUser.ProfilePicture + ")"
    }}></div>);
  }
}
class Header extends Component {
  render() {
    return (<div className='profileHeader'>
      <h1>{MegaUser.Username} {MyProfile ? <Link className="gearEditBtn" to="/me/edit"><img height="32px" src={Gear}/></Link>:""}</h1>
      <h5>{MegaUser.CityName}, {MegaUser.StateCode}</h5>
      <h5>{MegaUser.Followers} followers</h5>
      <h5>{MegaUser.Following} following</h5>
      <h5>{MegaUser.Playlists} created playlists</h5>
      {!MyProfile ? (
      <button className="btn-secondary">Follow</button>
      ):""}
    </div>);
  }
}
class TabAbout extends Component {
  render() {
    return (<div className="container">
      {MyProfile ? (<AlertCompleteProfile/>) : ""}
      <div className="container-fluid">
      <h2>Basic Information</h2>
      </div>
      <div className="row justify-content-center">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-header">
            Personal Information
            </div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Full Name</li>
              <li className="list-group-item">City</li>
              <li className="list-group-item">Playlists</li>
              <li className="list-group-item">Following</li>
              <li className="list-group-item">Followers</li>
            </ul>
          </div>
        </div>
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-header">
            Interests
            </div>
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item">Full Name</li>
              <li className="list-group-item">City</li>
              <li className="list-group-item">Playlists</li>
              <li className="list-group-item">Following</li>
              <li className="list-group-item">Followers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>)
  }
}
class TabPlaylists extends Component {
  render() {
    return (
      <div className="mt-3 contain-fluid card">
        <div className="card-body">
        <h3>First Playlist</h3>
        <p>Created by joseph on this date lol</p>
        </div>
      </div>)
  }
}
class TabFollowing extends Component {
  render() {
    return (<div>who u following</div>)
  }
}
class AlertCompleteProfile extends Component {
  render() {
    return (<div className="card-body">
    <h5 className="card-title">Complete your profile</h5>
    <p className="card-text">Add information to your profile so we can provide more relevant music to you!</p>
    <Link to="/me/edit" className="btn btn-primary">Edit Profile</Link>
  </div>);
  }
}

function test() {
  $('.ui.menu .item')
    .tab({
      history: true,
      historyType: 'state',
      path: '/modules/tab.html'
    });
}
export default MeProfile;