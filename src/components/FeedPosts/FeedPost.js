import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';
import ConfirmModal from '../Modal/Confirm';
import FormErrors from '../FormErrors';
import PostHeader from "./PostHeader";

class FeedPost extends Component {
	constructor(props) {
		super(props);
		this.dropdownMenu = React.createRef();
		this.newTitle = React.createRef();
		this.newContent = React.createRef();
		this.errors = React.createRef();

		var res = props.PostResponse;

		this.state = {
			editing: false,
			confirmDelete: false,

			author: res.megaUser,
			permission: res.permission,
			post: res.post
		}
	}
	PromptDelete() {
		this.setState({
			confirmDelete: true
		});
	}
	DeletePost() {
		var PostId = this.state.post.postId;
		mApi.post("api", `feed/${PostId}/delete`).done(e => {
			this.setState({
				removed: true
			});
		});
		this.setState({
			confirmDelete: false
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
		var PostId = this.state.post.postId;

		mApi.post("api", `feed/${PostId}/update`, {
			Title: title,
			Content: body
		}).done(e => {
			var post = this.state.post;
			post.content = body;
			post.title = title;
			this.setState({
				post: post,
				editing: false
			});
		}).fail(this.DisplayErrors.bind(this));
	}
	DisplayErrors(res) {
		var errors = [{
			code: res.statusCode,
			message: res.statusText
		}];
		if (res.responseJSON)
			errors = res.responseJSON;
		this.errors.current.setState({
			Errors: errors
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
		const { confirmDelete, editing, post, author, permission } = this.state;
		const { ProfileUser, Permission } = this.props;

		var Title = post.title;
		var Content = post.content;
		var FullName = ProfileUser.firstName + " " + ProfileUser.lastName;
		var href = "/p/" + ProfileUser.username;


		if (this.state.removed) return <></>;

		//Remove post modal
		var decline = () => { this.setState({ confirmDelete: false }) };
		var accept = this.DeletePost.bind(this);
		var title = "Remove Post";
		var body = "Are you sure you want to remove this post? Once removed, this post will be gone forever. We cannot undo this action.";
		var removeModal = <ConfirmModal onAccept={accept} onDecline={decline} Title={title} Body={body} />;

		var PostOptions = (
			<div className="dropdown float-right" style={{
				whiteSpace: "nowrap"
			}}>
				<div onClick={this.toggleDropdown.bind(this)} className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Edit
                </div>
				<div ref={this.dropdownMenu} className="dropdown-menu-right dropdown-menu" aria-labelledby="navbarDropdown">
					{permission.modifiable && <div className="dropdown-item" href="#" onClick={this.ToggleModify.bind(this)}>Modify</div>}
					{permission.removable && <div className="dropdown-item" href="#" onClick={this.PromptDelete.bind(this)}>Remove</div>}
					{confirmDelete && removeModal}
				</div>
			</div>);

		var Editable = permission.removable || permission.modifiable;
		return (
			<div className="card m-4 FeedPost">
				<PostHeader {...this.props}/>
				<div className="card-body">
					<FormErrors ref={this.errors} />
					<Link to={href} className="Icon" style={{
						backgroundImage: ProfileUser.profilePicture ? `url('${ProfileUser.profilePicture}')` : ""
					}}>

					</Link>
					{editing && <>
						<small className="text-mute">Post Title</small>
						<input className="form-control" ref={this.newTitle} type="text" defaultValue={Title} />
						<small className="text-mute">Post Content</small>
						<textarea className="md-textarea form-control" ref={this.newContent} defaultValue={Content}></textarea>
						<button onClick={this.EditPost.bind(this)} className="btn btn-success m-2">Save Changes</button>
						<button onClick={this.ToggleModify.bind(this)} className="btn btn-secondary m-2">Cancel</button>
					</>}
					{!editing && <>
						<p className="">{Content}</p>
						<a href="#" className="btn btn-default m-2">Like</a>
						<a href="#" className="btn btn-default m-2">Share</a>
					</>}
				</div>
			</div>
		)
	}
}
export default FeedPost;