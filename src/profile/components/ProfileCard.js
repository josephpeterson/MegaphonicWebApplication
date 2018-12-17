import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';
import {RelationshipStatuses} from '../../services/ApiMappers';
import RelationshipButton from '../../components/RelationshipButton';

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
		var Artist = !isNaN(User.ArtistId);
		var Relationship = this.props.Relationship;
		var href = "/a/" + User.Username;
		var profilePictureSrc = User.ProfilePicture ? User.ProfilePicture : "/img/profile_default.jpg";

		return (
			<div className="ProfileCard card mb-2">
				<div className="card-body">
					<img className="card-img-top" src={profilePictureSrc} alt="Card image cap" />
					<h5 className="card-title"><Link to={href}>{User.Title}</Link></h5>
					<div className="row">
						<div className="col-6 col-md-4">
							<small className="text-muted">Milwaukee, WI</small>
							<br />
							<small className="text-muted">{User.Followers} followers</small>

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