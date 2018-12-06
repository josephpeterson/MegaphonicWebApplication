// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import { Configuration } from './config';
import oidc from 'oidc-client';


//History (todo: remove this one day)
import createHistory from 'history/createBrowserHistory'
var history = createHistory();

var mgr = new oidc.UserManager(Configuration.auth);

export default class Auth {

  constructor() {
    this.history = history;
  }
  login() {
    var attempt = mgr.signinRedirect();
    return attempt;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    mgr.signoutRedirect();
    // Clear access token and ID token from local storage

    // navigate to the home route
    //window.location = "/";
  }

  handleAuthentication() {
    var t = this;
    new oidc.UserManager().signinRedirectCallback().then(function (authResult) {
      t.setSession(authResult);
    }).catch(function (e) {
      console.error(e);
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location = "/";
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}