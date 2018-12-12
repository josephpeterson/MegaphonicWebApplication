// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

class ProfileIcon extends Component {
  render() {
    var profilePicture = `url('${this.props.src}')`;
    return (
      <div className='profileBadge' style={{
        backgroundImage: profilePicture
      }}>
      </div>
    );
  }
}

class Topbar extends Component {
  logout() {
    this.props.auth.logout();
  }
  render() {
    var user = this.props.MegaUser;
    var path = this.props.location.pathname;
    var location = this.props.location;

    return (
      <div id="topbar" className="container">
        <nav className="navbar fixed-top navbar-toggleable-md navbar-dark">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to='/'>
            <img src="logo.png" width="30" height="30" alt="" />
          </Link>
          <Link className="navbar-brand" to='/'>
            Megaphonic
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className='nav-item'>
                <NavLink location={location} to="/explore">Explore</NavLink>
              </li>
              <li className='nav-item'>
                <NavLink location={location} to="/calendar">Calendar</NavLink>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Playlists</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Shows</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Connect</a>
              </li>
            </ul>
            <div className='navbar-nav float-right'>
              <form className="form-inline my-2 my-lg-0 w-100">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                <button className="btn btn-warning mr-3" type="submit">Search</button>
              </form>
              <NavLink location={location} to="/me" className='profileItem'>
                <ProfileIcon src={user.ProfilePicture} text=""/>
                {user.FirstName + " " + user.LastName}
              </NavLink>
              <button className='btn-danger' onClick={this.logout.bind(this)}>Logout</button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
class NavLink extends Component {
  render() {
    var location = this.props.location;
    var to = this.props.to;

    var active = location.pathname == to;
    var c = this.props.className + " nav-link " + (active ? "active" : "");

    return (<Link to={to} className={c}>{this.props.children}</Link>)
      ;
  }
}
export default Topbar;