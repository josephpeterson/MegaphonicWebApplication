import React, { Component } from 'react';
import $ from "jquery";

class Topbar extends Component {

  scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth", // or "auto" or "instant"
      block: "start" // or "end"
  });
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div className="container">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">Megaphonic</a>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
      <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" onClick={() => this.scrollToSection("register")}>Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#about" onClick={() => this.scrollToSection("about")}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" onClick={() => this.scrollToSection("contact")}>Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" onClick={this.props.handleLogin}>Login</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

    );
  }
}

export default Topbar;