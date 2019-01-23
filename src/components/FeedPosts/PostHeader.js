import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';
import FormErrors from '../FormErrors';
import RemovePostModal from './modal/RemovePost';

class PostHeader extends Component {
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

		console.log("Test this:",this.state.permission);
		//var Title = post.title;
		var Content = this.props.children;
		var FullName = ProfileUser.firstName + " " + ProfileUser.lastName;
		var href = "/p/" + ProfileUser.username;
		
		var decline = () => { this.setState({ confirmDelete: false }) };		

		if (this.state.removed) return <></>;

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
					{confirmDelete && <RemovePostModal onDecline={decline}/>}
				</div>
			</div>);

		var Editable = permission.removable || permission.modifiable;
		return (
			<h6 className="card-header Title">
				<Link to={href}>
					<small className='text-secondary'>{FullName}</small>
				</Link>
				{Editable && PostOptions}
			</h6>
		)
	}
}
export default PostHeader;