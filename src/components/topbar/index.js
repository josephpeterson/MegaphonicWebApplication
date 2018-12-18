// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import $ from 'jquery';

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
  constructor(props) {
    super(props);
    this.searchQuery = React.createRef();
    this.dropdownMenu = React.createRef();
  }
  logout() {
    this.props.auth.logout();
  }
  render() {
    var user = this.props.MegaUser;
    var path = this.props.location.pathname;
    var location = this.props.location;

    var href_profile = "/p/" + user.username;

    return (
      <div id="topbar" className="container">
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark">
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
              <form ref={this.searchQuery} className="form-inline my-2 my-lg-0 w-100">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" name="q" />
                <button onClick={this.search.bind(this)} className="btn btn-warning mr-3" type="submit" >Search</button>
              </form>
              <NavLink location={location} to={href_profile} className='profileItem'>
                <ProfileIcon src={user.profilePicture} text="" />
                {user.firstName + " " + user.lastName}
              </NavLink>
              <div className="nav-item dropdown" style={{
                whiteSpace: "nowrap"
              }}>
                <a onClick={this.toggleDropdown.bind(this)} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Settings
                </a>
                <div ref={this.dropdownMenu} className="dropdown-menu-right dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to={href_profile + "/edit"} className="dropdown-item">Edit Profile</Link>
                  <a className="dropdown-item" href="#">Help Center</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">About</a>
                  <a className="dropdown-item" href="#">Report a bug</a>
                  <a className="dropdown-item" href="#">View Changelog</a>
                  <a className="dropdown-item" onClick={this.logout.bind(this)}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  toggleDropdown() {
    var menu = this.dropdownMenu.current;
    var open = $(menu).hasClass("show");
    if (!open) {
      $(menu).toggleClass("show");
      var handler = function (event) {
        //event.preventDefault();
        $(menu).removeClass("show");
        $(document.body).unbind("click", handler);
      }
      $(document.body).bind("click", handler);
    }
  }
  search(event) {
    event.preventDefault();
    var q = $(this.searchQuery.current).serialize().substring(2);
    this.props.history.push(`/explore/${q}`);
  }
}
class NavLink extends Component {
  render() {
    var location = this.props.location;
    var to = this.props.to;

    var active = location.pathname.indexOf(to) != -1;
    var c = this.props.className + " nav-link " + (active ? "active" : "");

    return (<Link to={to} className={c}>{this.props.children}</Link>)
      ;
  }
}
export default Topbar;