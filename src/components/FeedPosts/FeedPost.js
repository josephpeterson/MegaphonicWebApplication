import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';

class FeedPost extends Component {
	constructor(props) {
		super(props);
		this.dropdownMenu = React.createRef();
		this.newTitle = React.createRef();
		this.newContent = React.createRef();

		this.state = {
			editing: false,
			Title: this.props.Post.title,
			Content: this.props.Post.content
		}
	}
	DeletePost() {
		var PostId = this.props.Post.postId;
		mApi.post("api", `feed/${PostId}/delete`).done(e => {
			this.setState({
				removed: true
			});
		});
	}
	ToggleModify() {
		this.setState({
			editing: !this.state.editing
		});
	}
	EditPost() {
		var title = this.newTitle.current.value;
		var body = this.newContent.current.value;
		var PostId = this.props.Post.postId;

		mApi.post("api", `feed/${PostId}/update`, {
			Title: title,
			Content: body
		}).done(e => {
			this.setState({
				Title: title,
				Content: body,
				editing: false
			});
		});
	}
	toggleDropdown() {
		var menu = this.dropdownMenu.current;
		var open = $(menu).hasClass("show");
		if (!open) {
			$(menu).toggleClass("show");
			var handler = function (event) {
				//event.preventDefault();
				$(menu).removeClass("show");
				$(document.body).unbind("click", handler);
			}
			$(document.body).bind("click", handler);
		}
	}
	render() {
		const { Title, Content } = this.state;
		const { ProfileUser } = this.props;
		var FullName = ProfileUser.firstName + " " + ProfileUser.lastName;
		var href = "/p/" + ProfileUser.username;

		if (this.state.removed) return <></>;

		var Editable = (
			<div className="dropdown float-right" style={{
				whiteSpace: "nowrap"
			}}>
				<div onClick={this.toggleDropdown.bind(this)} className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Edit
                </div>
				<div ref={this.dropdownMenu} className="dropdown-menu-right dropdown-menu" aria-labelledby="navbarDropdown">
					<div className="dropdown-item" href="#" onClick={this.ToggleModify.bind(this)}>Modify</div>
					<div className="dropdown-item" href="#" onClick={this.DeletePost.bind(this)}>Remove</div>
				</div>
			</div>);

		var Editing = this.state.editing;

		//TODO replace this with database permissions
		var canEdit = ProfileUser.accountId == this.props.MegaUser.accountId;

		return (
			<div className="card m-4 FeedPost">
				<h6 className="card-header Title">
					<small className='text-secondary'>{FullName}</small>
					{canEdit && Editable}
				</h6>
				<div className="card-body">
					<Link to={href} className="Icon" style={{
						backgroundImage: ProfileUser.profilePicture ? `url('${ProfileUser.profilePicture}')` : ""
					}}>

					</Link>
					{Editing && <>
						<small className="text-mute">Post Title</small>
						<input className="form-control" ref={this.newTitle} type="text" defaultValue={Title} />
						<small className="text-mute">Post Content</small>
						<textarea className="md-textarea form-control" ref={this.newContent} defaultValue={Content}></textarea>
						<button onClick={this.EditPost.bind(this)} className="btn btn-success m-2">Save Changes</button>
						<button onClick={this.ToggleModify.bind(this)} className="btn btn-secondary m-2">Cancel</button>
					</>}
					{!Editing && <>
						<h4 className="">{Title}</h4>
						<p className="p-1">{Content}</p>
						<a href="#" className="btn btn-default m-2">Like</a>
						<a href="#" className="btn btn-default m-2">Share</a>
					</>}
				</div>
			</div>
		)
	}
}
export default FeedPost;