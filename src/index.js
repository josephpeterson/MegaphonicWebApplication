// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, Switch } from 'react-router-dom';

import App from './App';
import LandingPage from './landing';
import * as serviceWorker from './serviceWorker';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './Auth';
import CallbackLoadingPage from './callback';
import createHistory from 'history/createBrowserHistory';
import mApi from './services/MegaphonicAPI';
var history = createHistory();

const auth = new Auth();

const handleAuthentication = ({ location }) => {
    //Check if we have a token
    //?t=TOKEN
    var token = location.search.substring(3);
    if (token)
        auth.handleAuthentication(token);
}

var HasToken = auth.isAuthenticated();

if (HasToken) {
    ReactDOM.render(
        <CallbackLoadingPage />,
        document.getElementById('root')
    );
    //Make an api request to our data. If we get data, we're still authorized.
    mApi.get("api", "user").done(data => {
        var user;
        try {
            user = JSON.parse(data);
            user = fillProfileDefaults(user);
        }
        catch (e) {
            //Error occured
            console.error(e);
            auth.login();
            return;
        }
        ReactDOM.render(
            <Router history={history}>
                <App history={history} auth={auth} MegaUser={user} />
            </Router>,
            document.getElementById('root')
        );
    }).fail(data => {
        //Redirect to login
        console.error("Api call failed");
        auth.unset();
        auth.login();
    });
}
else {
    ReactDOM.render(
        <Router history={history}>
            <Switch>
                <Route path="/callback" render={(props) => {
                    handleAuthentication(props);
                    //Loading logo
                    return <CallbackLoadingPage {...props} />
                }} />
                <Route path="/login" render={(props) => {
                    auth.login();
                    return (<div></div>);
                }} />
                <Route render={(props) => <LandingPage auth={auth} {...props} />} />
            </Switch>
        </Router>,
        document.getElementById('root')
    );
}

const ProfileDefaultValues = {
    ProfilePicture: "/img/profile_default.jpg",
    HeaderPicture: "https://scontent-ort2-2.xx.fbcdn.net/v/t1.0-9/12190099_10205091453227046_4962877471085643424_n.jpg?_nc_cat=102&_nc_ht=scontent-ort2-2.xx&oh=abaf59b5503a36a1a48fd1e361ede9c0&oe=5C99EB96"
}

function fillProfileDefaults(user) {
    for (var i in ProfileDefaultValues) {
        if (user[i] == undefined)
            user[i] = ProfileDefaultValues[i];
    }
    return user;
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
