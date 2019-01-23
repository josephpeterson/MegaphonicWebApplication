import React, { Component } from 'react';
import Feed from "../../../components/FeedPosts/PostFeed";
class PostFeed extends Component {
	render() {
		return(<div className='card mb-3'>
			<div className='card-body'>
				<h3>Megaphonic Blog</h3>
				<Feed PostLocationId={13} LocationType={2} LocationId={0}/>
			</div>
		</div>
		)
	}
}
export default PostFeed;