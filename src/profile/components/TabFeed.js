import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FeedPost from '../../components/FeedPosts/FeedPost';
import CreatePost from '../../components/FeedPosts/CreatePost';
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
		var FeedId = User.postLocationId;
		var url = `feed/${FeedId}`;
		mApi.get("api",url).fail(e => {
			console.error(e);
			this.setState({
				posts: [],
				loaded: true
			});
		}).done(posts => {
			//window.location.reload();
			this.setState({
				posts: posts,
				loaded: true
			});
		});
	}
	refresh()
	{
		this.loadPosts();
	}
	AddPost(post)
	{
		this.refresh();
	}
	render() {
		if(!this.state.loaded)
		{
			return <div className="row justify-content-center p-5">
				<img className="" src="/img/loading.svg"/>
			</div>;
		}
		var User = this.props.ProfileUser;
		var posts = this.state.posts;
		var Artist = isNaN(User.accountId);		
		var PostLocationType = Artist ? PostLocationTypes.Artist:PostLocationTypes.Profile;
		var PostLocationId = Artist ? User.artistId:User.accountId;

		return (<div className="container">
			<div className="container-fluid">
				{<CreatePost LocationType={PostLocationType} LocationId={PostLocationId} onCreated={this.AddPost.bind(this)}/>}
				{posts.length == 0 && <EmptyTab src={imgNothing}>No Posts Yet</EmptyTab>}
				{posts.map((post,i) => {
					var user = post.megaUser;
					var p = post.post;
					console.log(post);
					return (<FeedPost key={i} ProfileUser={user} PostResponse={post} MegaUser={this.props.MegaUser}/>)
				})}
			</div>
		</div>)
	}
}
export default TabFeed;