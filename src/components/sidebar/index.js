// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './sidebar.css';

class NavItem extends Component {
  render() {
    return (
        <Link to={'/' + this.props.href} className='home'>{this.props.title}</Link>
    );
  }
}
class Sidebar extends Component {
    render() {
      return (
        <nav className="sidebar">
          <NavItem href="" title="Home"/>
          <NavItem href="artist" title="Artist"/>
          <NavItem href="settings" title="Settings"/>
        </nav>
      );
    }
  }
  
  export default Sidebar;