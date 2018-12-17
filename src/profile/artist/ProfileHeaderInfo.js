import React, { Component } from 'react';
import Gear from "../gear.png";
import MusicIcon from './no_music.png';
import mApi from '../../services/MegaphonicAPI';

const RelationshipStatuses = {
	Blocked: -1,
	None: 0,
	Minimal: 1,
	Member: 2,
	Owner: 3
};


class ProfileHeaderInfo extends Component {
	constructor(props)
	{
		super(props);
		this.state = {
			RelationshipStatus: 0,
			loaded: false
		}
	}
	componentDidMount()
	{
		var ArtistId = this.props.ProfileUser.ArtistId;
		mApi.get("api",`artist/RelationshipStatus/${ArtistId}`).fail(e => {
			console.error(e);
		}).done(data => {
			var relation = JSON.parse(data);
			var status = relation.Status;

			this.setState({
				RelationshipStatus: status,
				loaded: true,
			});
		});
	}
	render() {
		if(!this.state.loaded)
		{
			return <></>;
		}
		var User = this.props.ProfileUser;
		var Me = this.props.Me;

		var href_edit = "/a/" + User.Username + "/manage";

		var status = this.state.RelationshipStatus;

		var btn_followTxt;
		var btn_followCls;

		console.log("todo status:",status);

		var callback = this.toggleRelationship.bind(this);

		console.log(status);
		switch(status)
		{
			case RelationshipStatuses.Minimal:
				btn_followTxt = "Unfollow";
				btn_followCls = "btn-danger";
				break;
			case RelationshipStatuses.Owner:
			case RelationshipStatuses.Member:
				btn_followTxt = "Manage";
				btn_followCls = "btn-warning";
				callback = () => {
					this.props.history.push(href_edit);
				}
				break;
			default:
				btn_followTxt = "Follow";
				btn_followCls = "btn-success";
		}

		var relationshipBtn = <button onClick={callback} className={`btn ${btn_followCls} m-2`}>{btn_followTxt}</button>;	

		var location;
		
		if(User.CityName)
			location = User.CityName;
		if(User.StateCode)
			location = User.StateCode;

		var biography = User.Biography;


		
		return (
			<div className='profileHeader artist'>
				<div className="profileContent">
				<h4>{User.Title}</h4>
				<h6>{location}</h6>
				<div className="row">
				<p className="col-sm biography">{biography}</p>				
				</div>
				</div>
	
				<div className="btn-grp">
					{relationshipBtn}
					<button className="btn btn-info m-2">Donate</button> 
				</div>
			</div>
		);
	}

	//Follow/Unfollow button
	toggleRelationship()
	{
		console.log("asdas");
		var ArtistId = this.props.ProfileUser.ArtistId;
		mApi.post("api",`artist/follow/${ArtistId}`).fail(e => {
			console.error(e);
		}).done(data => {

			window.location.reload();
		});
	}
}
export default ProfileHeaderInfo