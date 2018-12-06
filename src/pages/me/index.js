import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react'
import Calendar from '../../components/calendar';
import $ from 'jquery';
import './main.css';

const panes = [
  { menuItem: 'Feed', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Calendar', render: () => <Tab.Pane><Calendar /></Tab.Pane> },
  { menuItem: 'Support', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

class MeProfile extends Component {
  render() {
    return (
      <div className="container">
        <ProfileBanner/>
        <ProfilePages/>
        <div className="card" style={{width: "18rem"}}>
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
        <div className="card" style={{width: "18rem"}}>
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
    );
  }
}

class ProfilePages extends Component {
  render() {
    return (<div className="card text-center">
    <div className="card-header">
      <ul className="nav nav-tabs card-header-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <h5 className="card-title">Special title treatment</h5>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
  </div>);
  }
}
class ProfileBanner extends Component {
  render() { 
    return (<div className='profileBanner'><Portrait/><Header/></div>);
  }
}
class Portrait extends Component {
  render() {
    return (<div className='profilePortrait'></div>);
  }
}
class Header extends Component {
  render() {
    return (<div className='profileHeader'>
      <h1>Joseph Peterson<span className="badge badge-light">4</span></h1>
    </div>);
  }
}
function test() {
  $('.ui.menu .item')
    .tab({
      history: true,
      historyType: 'state',
      path: '/modules/tab.html'
    })
    ;
}
export default MeProfile;