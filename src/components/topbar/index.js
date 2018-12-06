// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

class ProfileIcon extends Component {
  render() {
    return (
        <Link className="nav-link profileIcon" to='/me' >Profile<span className='profileBadge'></span></Link>
    );
  }
}

class Topbar extends Component {
  logout() {
    this.props.auth.logout();
  }
  render() {
    return (
      <div className="top container">
        <nav className="navbar fixed-top navbar-toggleable-md navbar-dark bg-dark">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to='/'>
            <img src="logo.png" width="30" height="30" alt="" />
          </Link>
          <Link className="navbar-brand" to='/'>
            Megaphonic <span className="sr-only">(current)</span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
              <Link to='/explore' className="nav-link">Explore</Link>
              </li>
              <li className="nav-item">
                <Link to='/calendar' className="nav-link">Calendar</Link>
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
            <div className='d-flex justify-content-end'>
              <ProfileIcon/>
              <button className='btn-danger' onClick={this.logout.bind(this)}>Logout</button>)
              <form className="form-inline my-2 my-lg-0 w-100">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Topbar;