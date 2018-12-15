// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import { Configuration } from './config';
import $ from 'jquery';

export default class Auth {
  login() {
    //Redirect to login
    window.location = Configuration.auth.authority + "/login/" + encodeURIComponent("callback");
  }
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  logout() {
    this.unset();
    //TODO: delete cookies, tell server we logged out
    window.location = "/";
  }
  handleAuthentication(token) {
    var jwt = this.parseJwt(token);
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((jwt.exp * 1000) + new Date().getTime());
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('unique_name', jwt.unique_name);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location = "/";
  }
  unset() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('unique_name');
    localStorage.removeItem('expires_at');
  }
  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    if(!localStorage.getItem("jwtToken"))
      return false;
    let expiresAt = JSON.parse(localStorage.getItem('expires_at') * 1000);
    return new Date().getTime() < expiresAt;
  }
}