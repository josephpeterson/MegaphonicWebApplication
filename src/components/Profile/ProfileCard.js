import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RelationshipButton from './RelationshipButton';

class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	componentDidMount() {

	}
	render() {
		var history = this.props.history;
		var User = this.props.ProfileUser;
		var Artist = !isNaN(User.artistId);
		var Relationship = this.props.Relationship;
		var href = "/a/" + User.username;

		var profilePictureSrc = User.profilePicture ? User.profilePicture : "/img/profile_default.jpg";
		var title = User.title;
		var header1 = User.cityName ? User.cityName:"A spooky location...";
		var header2 = User.followers + " followers";

		return (
			<div className="ProfileCard card mb-2">
				<div className="card-body">
					<img className="card-img-top" src={profilePictureSrc} alt="Card image cap" />
					<h5 className="card-title"><Link to={href}>{title}</Link></h5>
					<div className="row">
						<div className="col-6 col-md-4">
							<small className="text-muted">{header1}</small>
							<br />
							<small className="text-muted">{header2}</small>

						</div>
						<div className="col-12 col-md-8">
						<RelationshipButton ProfileUser={User} Relationship={Relationship} history={history}/>
						</div>
					</div>
					<div className="row">
					</div>
				</div>
			</div>
		);
	}
}
export default ProfileCard;