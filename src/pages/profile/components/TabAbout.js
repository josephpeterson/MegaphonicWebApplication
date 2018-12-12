import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

class TabAbout extends Component {
	render() {
		var Me = this.props.Me;
		return (<div className="container">
			{Me ? (<AlertCompleteProfile />) : ""}
			<div className="container-fluid">
				<h2>Basic Information</h2>
			</div>
			<div className="row justify-content-center">
				<div className="card" style={{ width: "18rem" }}>
					<div className="card-header">
						Personal Information
			  </div>
					<div className="card-body">
						<ul className="list-group">
							<li className="list-group-item">Full Name</li>
							<li className="list-group-item">City</li>
							<li className="list-group-item">Playlists</li>
							<li className="list-group-item">Following</li>
							<li className="list-group-item">Followers</li>
						</ul>
					</div>
				</div>
				<div className="card" style={{ width: "18rem" }}>
					<div className="card-header">
						Interests
			  </div>
					<div className="card-body">
						<ul className="list-group">
							<li className="list-group-item">Full Name</li>
							<li className="list-group-item">City</li>
							<li className="list-group-item">Playlists</li>
							<li className="list-group-item">Following</li>
							<li className="list-group-item">Followers</li>
						</ul>
					</div>
				</div>
			</div>
		</div>)
	}
}
class AlertCompleteProfile extends Component {
  render() {
    return (<div className="card-body text-center">
    <h5 className="card-title">Complete your profile</h5>
    <p className="card-text">Add information to your profile so we can provide more relevant music to you!</p>
    <Link to="/me/edit" className="btn btn-primary">Edit Profile</Link>
  </div>);
  }
}
export default TabAbout;