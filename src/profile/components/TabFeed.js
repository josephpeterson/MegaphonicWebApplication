import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FeedPost from '../components/FeedPost';
import CreatePost from '../components/CreatePost';
import mApi from '../../services/MegaphonicAPI';
import {PostLocationTypes} from '../../services/ApiMappers';
import EmptyTab from '../components/EmptyTab';

import imgNothing from '../icon_post.png';

class TabFeed extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: [],
			loaded: false,
		}
	}
	componentDidMount() {
		this.loadPosts();
	}
	loadPosts() {
		var User = this.props.ProfileUser;

		var Artist = isNaN(this.props.ProfileUser.AccountId);		
		var PostLocationType = Artist ? PostLocationTypes.Artist:PostLocationTypes.Profile;
		var PostLocationId = Artist ? User.ArtistId:User.AccountId;
	
		var url = `feed/v/${PostLocationType}/${PostLocationId}`;

		mApi.get("api",url).fail(e => {
			console.error(e);
			this.setState({
				posts: [],
				loaded: true
			});
		}).done(data => {
			//window.location.reload();
			this.setState({
				posts: JSON.parse(data),
				loaded: true
			});
		});
	}
	render() {
		if(!this.state.loaded)
		{
			return <div className="row justify-content-center p-5">
				<img className="" src="/img/loading.svg"/>
			</div>;
		}

		var Me = this.props.Me;
		var User = this.props.ProfileUser;
		var posts = this.state.posts;


		var Artist = isNaN(this.props.ProfileUser.AccountId);		
		var PostLocationType = Artist ? PostLocationTypes.Artist:PostLocationTypes.Profile;
		var PostLocationId = Artist ? User.ArtistId:User.AccountId;
		return (<div className="container">
			<div className="container-fluid">
				{<CreatePost LocationType={PostLocationType} LocationId={PostLocationId} {...this.props}/>}
				{posts.length == 0 && <EmptyTab src={imgNothing}>No Posts Yet</EmptyTab>}
				{posts.map((post,i) => {
					var user = post.MegaUser;
					var Title = post.Post.Title;
					var Content = post.Post.Content;
					var Timestamp = "";

					return (<FeedPost key={i} ProfileUser={user} Title={Title} Content={Content} Timestamp={Timestamp} />)
				})}
			</div>
		</div>)
	}
}
export default TabFeed;