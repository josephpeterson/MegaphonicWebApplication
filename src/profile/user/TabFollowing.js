import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';
import ProfileCard from "../../components/Profile/ProfileCard";

class TabFollowing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			followers: []
		}
	}
	componentDidMount() {
		this.loadFollowers();
	}
	render() {
		if(!this.state.loaded)
		{
			return <div className="row justify-content-center p-5">
				<img className="" src="/img/loading.svg"/>
			</div>;
		}
		var history = this.props.history;
		var followers = this.state.followers;
		var count = followers.length;
		if (count == 0) {
			return (
				<div>
					<div className="alert alert-warning">
						You are not following anyone! If you are an artist you may make a band. Otherwise you may go to the explore page to find some new music!
					</div>
				</div>
			)
		}

		return (
			<div className="">
				{followers.map((follower, id) => {
					var href = "/a/" + follower.username;
					var User = follower.artist;
					var Relationship = follower.relationship;
					var MyRelationship = follower._Relationship;
					console.log(follower);
					return (
						<ProfileCard key={id} history={history} ProfileUser={User} Relationship={MyRelationship}/>
					)
				}
				)}
			</div>)
	}

	//Follow/Unfollow button
	loadFollowers() {
		var id = this.props.ProfileUser.accountId;
		mApi.get("api", `user/${id}/followers`).fail(e => {
			console.error(e);
			this.setState({
				followers: [],
				loaded: true
			});
		}).done(data => {
			//window.location.reload();
			this.setState({
				followers: data,
				loaded: true
			});
		});
	}
}
export default TabFollowing;