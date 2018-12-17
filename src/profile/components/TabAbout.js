import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';

class TabAbout extends Component {
	render() {
		var Me = this.props.Me;
		var User = this.props.ProfileUser;

		return (<div className="container">
			{Me ? (<AlertCompleteProfile />) : ""}
			<div className="container-fluid">
				<h5>Biography</h5>
				<p>
					stuff here
				</p>
				<h5>Basic Information</h5>
				<p>
					stuff here
				</p>
				<h5>Members ({User.Members})</h5>
				<p>
					stuff here
				</p>
				<h5>Contact</h5>
				<p>
					stuff here
				</p>
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