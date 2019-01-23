// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import "./main.css";
import "./vendor/font1.css";
//import "./vendor/bootstrap.css";
import CreateStuff from "./js/grayscale";
import AuthError from "./components/AuthError";

import AboutSection from "./components/AboutSection";
import VenueSection from "./components/VenueSection";
import ArtistSection from "./components/ArtistSection";
import ContactSection from "./components/ContactSection";
import TopBar from "./components/topbar";
import RegisterSection from './components/RegisterSection';


class LandingPage extends Component {
  componentDidMount() {
    CreateStuff();
    this.props.history.replace("/");
  }
  render() {
    var auth = this.props.auth;
    return (
      <div className="landing">
        <AuthError id="AuthErrorModal" />
        <TopBar handleLogin={auth.login.bind(auth)} />
        <header className="masthead">
          <div className="row h-100 align-items-center">
            <div className="mx-auto text-center">
              <h1 className="mx-auto my-0 text-uppercase">Megaphonic</h1>
              <h2 className="text-white-50 mx-auto mt-2 mb-5">Find your next favorite Milwaukee artist</h2>
            </div>
          </div>
        </header>
        <RegisterSection auth={auth} btn_login={auth.login.bind(auth)} />
        <AboutSection />
        <VenueSection />
        <ContactSection />
        <footer className="bg-black small text-center text-white-50">
          <div className="container">
            Copyright &copy; Megaphonic 2018
          </div>
        </footer>
      </div>
    );
  }
}

export default LandingPage;