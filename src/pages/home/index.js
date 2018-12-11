// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
//import './sidebar.css';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  logout() {
    this.props.auth.logout();
  }
  render() {
    var logged = this.props.auth.isAuthenticated();
    return (
      <div>
        <div className='card'>
          <div className='card-body'>
            Welcome to Megaphonic. This is the dashboard page. Still under construction.
            <br />
            <hr />
            Login status: {logged ? "Logged In" : "Unauthorized"}
            <button onClick={this.test.bind(this)}>Test MegaphonicAPI</button>
          </div>
        </div>
      </div>
    );
  }
  test() {
    this.props.auth.api("api","user")
  }
}

export default Home;