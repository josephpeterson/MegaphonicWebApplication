import React, { Component } from 'react';
import Gear from "../gear.png";
import MusicIcon from './no_music.png';
import mApi from '../../services/MegaphonicAPI';
import RelationshipButton from '../../components/Profile/RelationshipButton';

const RelationshipStatuses = {
	Blocked: -1,
	None: 0,
	Minimal: 1,
	Member: 2,
	Owner: 3
};


class ProfileHeaderInfo extends Component {
	constructor(props) {
		super(props);

		var ProfileUser = props.ProfileUser;
		this.state = {
			ProfileUser: ProfileUser,
			Relationship: ProfileUser.relationship
		}
	}
	componentDidMount() {
		return;
	}
	render() {
		const { ProfileUser, Relationship } = this.state;

		var location;
		if (ProfileUser.cityName)
			location = ProfileUser.cityName;
		if (ProfileUser.stateCode)
			location = ProfileUser.stateCode;
		var biography = ProfileUser.biography;

		return (
			<div className='profileHeader artist'>
				<div className="profileContent">
					<h4>{ProfileUser.title}</h4>
					<h6>{location}</h6>
					<div className="row">
						<p className="col-sm biography">{biography}</p>
					</div>
				</div>

				<div className="btn-grp">
					<RelationshipButton Relationship={Relationship} ProfileUser={ProfileUser} {...this.props} />
					<button className="btn btn-info m-2">Donate</button>
				</div>
			</div>
		);
	}

	//Follow/Unfollow button
	toggleRelationship() {
		console.log("asdas");
		var ArtistId = this.props.ProfileUser.ArtistId;
		mApi.post("api", `artist/follow/${ArtistId}`).fail(e => {
			console.error(e);
		}).done(data => {

			window.location.reload();
		});
	}
}
export default ProfileHeaderInfo