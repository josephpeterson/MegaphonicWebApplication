import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';


class FeedPost extends Component {
	render() {
		const {Title, Content, ProfileUser} = this.props;

		var FullName = ProfileUser.FirstName + " " + ProfileUser.LastName;

		var href = "/p/" + ProfileUser.Username;

		return (
				<div className="card m-4 FeedPost">
						<h6 className="card-header Title">{Title}</h6>

					<div className="card-body">
						<Link to={href} className="Icon" style={{
							backgroundImage: ProfileUser.ProfilePicture ? `url('${ProfileUser.ProfilePicture}')`:""
						}}>
					
						</Link>
						<p>{Content}</p>
						<a href="#" className="btn btn-default m-2">Like</a>
						<a href="#" className="btn btn-default m-2">Share</a>
					</div>
				</div>
		)
	}
}
export default FeedPost;