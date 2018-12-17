import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FeedPost from '../components/FeedPost';
import CreatePost from '../components/CreatePost';

class TabFeed extends Component {
	constructor(props)
	{
		super(props);
	}
	render() {
		var Me = this.props.Me;
		return (<div className="container">
			<div className="container-fluid">
				{Me && <CreatePost/>}
				<FeedPost/>
			</div>
		</div>)
	}
}
export default TabFeed;