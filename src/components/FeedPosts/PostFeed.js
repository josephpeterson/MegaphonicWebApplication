import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FeedPost from '../../components/FeedPosts/FeedPost';
import CreatePost from '../../components/FeedPosts/CreatePost';
import mApi from '../../services/MegaphonicAPI';
import { PostLocationTypes } from '../../services/ApiMappers';



class PostFeed extends Component {
	constructor(props) {
		super(props);

		//props
		//postLocationId
		//postLocationType
		//postLocationId

		this.state = {
			posts: [],
			loaded: false,
		}
	}
	componentDidMount() {
		this.loadPosts();
	}
	loadPosts() {
		var FeedId = this.props.PostLocationId;
		var url = `feed/${FeedId}`;
		mApi.get("api", url).fail(e => {
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
	refresh() {
		this.loadPosts();
	}
	AddPost(post) {
		this.refresh();
	}
	render() {
		if (!this.state.loaded) {
			return <div className="row justify-content-center p-5">
				<img className="" src="/img/loading.svg" />
			</div>;
		}
		var posts = this.state.posts;
		var PostLocationId = this.props.LocationId;
		var PostLocationType = this.props.LocationType;

		return (
			<div className="">
				{<CreatePost LocationType={PostLocationType} LocationId={PostLocationId} onCreated={this.AddPost.bind(this)} />}
				{posts.length == 0 && <h2>No posts yet</h2>}
				{posts.map((post, i) => {
					var user = post.megaUser;
					var p = post.post;
					console.log(post);
					return (<FeedPost key={i} ProfileUser={user} PostResponse={post} MegaUser={this.props.MegaUser} />)
				})}
			</div>)
	}
}
export default PostFeed;