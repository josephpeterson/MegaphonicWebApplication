import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gear from '../gear.png';

class ProfileHeader extends Component {
  render() {
    var User = this.props.MegaUser;
    var Me = this.props.Me;
    return (
      <div className='profileHeader'>
        <h1>{User.FirstName + " " + User.LastName} ({User.Username}) {Me ? <Link className="gearEditBtn" to="/me/edit"><img height="32px" src={Gear} /></Link> : ""}</h1>
        <h5>{User.CityName}, {User.StateCode}</h5>
        <h5>{User.Followers} followers</h5>
        <h5>{User.Following} following</h5>
        <h5>{User.Playlists} created playlists</h5>
        {!Me ? (
          <button className="btn-secondary">Follow</button>
        ) : ""}
      </div>
    );
  }
}
export default ProfileHeader;