import React, { Component } from 'react';

class ProfileHeader extends Component {
  render() {
    var headerSrc = this.props.src;
    return (
      <div className='profileBanner' style={
        {
          backgroundImage: "url(" + headerSrc + ")"
        }
      }>
        {this.props.children}
      </div>
    );
  }
}
export default ProfileHeader;