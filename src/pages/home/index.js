// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';

class Home extends Component {
  render() {
    var user = this.props.MegaUser;
    console.log(this.props.responseData);
    return (
      <div className='container p-5'>
        <div className='card m-3'>
          <div className='card-body'>
            <h3>Welcome to Megaphonic!</h3>
            <p>Hello! Welcome to Megaphonic. This is our homepage. Unfortunatly our website is still under construction. Slated for v1.0 release March of 2019.</p>
          </div>
        </div>
        <div className='card m-3'>
          <div className='card-body'>
            <h3>API Debug</h3>
            <p>This is for testing purposes only. Do not be concerned if these buttons appear to do nothing.</p>
            <hr />
            <button className='btn btn-info' onClick={this.test.bind(this)}>User Endpoint</button>
            <pre>
              {this.props.responseData}
            </pre>
          </div>
        </div>
        <UserDirectory />
      </div>
    );
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
class UserDirectory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    mApi.get("api", "user/all").fail(e => {
      this.setState({
        loading: false,
        error: e.statusText
      });
    }).done(data => {
      this.setState({
        loading: false,
        data: data
      });
    });
  }
  retry() {
    this.setState({
      loading: true
    });
    this.componentDidMount();
  }
  render() {
    const { loading, data, error } = this.state;

    if (loading) {
      return (
        <div className='card m-3'>
          <div className='card-body'>
            <h3>User Directory</h3>
            <div className="container">
              <div className="row justify-content-center">
                <img src="/img/loading.svg" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (error) {
      return (
        <div className='card m-3'>
          <div className='card-body'>
            <h3>User Directory</h3>
            <div className="container">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
              <button className="btn btn-info" onClick={this.retry.bind(this)}>Try Again</button>
            </div>
          </div>
        </div>
      );
    }

    //Parse the data
    var records = JSON.parse(data);
    return (
      <div className='card m-3'>
        <div className='card-body'>
          <h3>User Directory</h3>
          <p>Currently while search is being developed, you may access other peoples profiles by the links below:</p>
          <div className="container">
            {records.map((user, id) =>
              <div key={id} className="row">
                <a href={"/p/" + user.Username}>
                {user.Username} ({user.FirstName + " " + user.LastName})
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;