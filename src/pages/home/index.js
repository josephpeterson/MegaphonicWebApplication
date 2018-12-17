// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';

import UserDirectory from "./Test/UserDirectory";
import BandDirectory from "./Test/BandDirectory";

class Home extends Component {
  render() {
    var user = this.props.MegaUser;
    console.log(this.props.responseData);
    
    return (
      <div className='container'>
        <div className='card m-3'>
          <div className='card-body'>
            <h4>Welcome to Megaphonic!</h4>
            <h6 className="card-subtitle mb-2 text-muted">Development</h6>
            <p>Hello! Welcome to Megaphonic. This is our homepage. Unfortunatly our website is still under construction. Slated for v1.0 release March of 2019.</p>
          </div>
        </div>
        <div className='card m-3'>
          <div className='card-body'>
            <h3>API Debug</h3>
            <p>This is for testing purposes only. Do not be concerned if these buttons appear to do nothing.</p>
            <hr />
            <button className='btn btn-info' onClick={this.test.bind(this)}>User Endpoint</button>
            <button className='btn btn-info' onClick={this.show.bind(this)}>Modal Test</button>
            <pre>
              {this.props.responseData}
            </pre>
          </div>
        </div>
        <UserDirectory />
        <BandDirectory />
      </div>
    );
  }

  show() {
    console.log("Showing...");
    mApi.showDialog({
      title: "This is a test",
      body: "This is a test body"
    });
  }
  test(event) {
    var ele = event.target;
    ele.disabled = true;
    mApi.get("api", "user").done(data => {
      try {
        var o = JSON.parse(data);
        console.log(o);
      }
      catch (e) {
        console.log(data);
      }
      //this.props.responseData = data;
    }).always(() => {
      ele.disabled = false;
    });
  }
}
export default Home;