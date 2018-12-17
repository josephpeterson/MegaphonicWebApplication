import React, { Component } from 'react';
import Gear from "../gear.png";
import { Link } from 'react-router-dom';


class ProfileHeaderInfo extends Component {
	render() {
		var User = this.props.ProfileUser;
		var Me = this.props.Me;

		var href_edit = "/p/" + User.Username + "/edit";
		return (
			<div className='profileHeader'>
				<h3>{User.FirstName + " " + User.LastName} ({User.Username}) {Me ? <Link className="gearEditBtn" to={href_edit}><img height="32px" src={Gear} /></Link> : ""}</h3>
				<h5>{User.CityName}, {User.StateCode}</h5>
				<h5>{User.Followers} followers</h5>
				{!Me ? (
					<button className="btn-secondary">Follow</button>
				) : ""}
			</div>
		);
	}
}
export default ProfileHeaderInfo