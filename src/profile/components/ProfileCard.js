import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';

class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {

	}
	render() {
		var User = this.props.ProfileUser;
		var Artist = !isNaN(User.ArtistId);
		var href = (Artist ? "/a/" : "/p/") + User.Username;
		var profilePictureSrc = User.ProfilePicture ? User.ProfilePicture:"/img/profile_default.jpg";

		return (
			<div className="ProfileCard card mb-2">
				<div className="card-body">
				<img className="card-img-top" src={profilePictureSrc} alt="Card image cap" />
					<h5 className="card-title"><Link to={href}>{User.Title}</Link></h5>
					<div className="row">
					<small className="text-muted">Milwaukee, WI</small>					
					</div>
					<div className="row">
					<small className="text-muted">{User.Followers} followers</small>					
					</div>
				</div>
			</div>
		);
	}
}
export default ProfileCard;