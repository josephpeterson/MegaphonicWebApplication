import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';
import ProfileCard from "../components/ProfileCard";

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
					var href = "/a/" + follower.Username;
					return (
						<ProfileCard key={id} ProfileUser={follower}/>
					)
				}
				)}
			</div>)
	}

	//Follow/Unfollow button
	loadFollowers() {
		var AccountId = this.props.ProfileUser.Username;
		mApi.get("api", `user/following?Username=${AccountId}`).fail(e => {
			console.error(e);
			this.setState({
				followers: [],
				loaded: true
			});
		}).done(data => {
			//window.location.reload();
			this.setState({
				followers: JSON.parse(data),
				loaded: true
			});
		});
	}
}
export default TabFollowing;