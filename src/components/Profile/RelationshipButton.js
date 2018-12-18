import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';
import { RelationshipStatuses } from '../../services/ApiMappers';

export default class RelationshipButton extends Component {
	constructor(props)
	{
		super(props);

		var User = this.props.ProfileUser;
		var Relationship = this.props.Relationship;

		this.state = {
			Status: Relationship.status
		}
		this.btn = React.createRef();
	}
	render() {
		var Status = this.state.Status;

		var relationBtn;
		var text = "Text";
		var cls = "btn-primary";
		switch (Status) {
			case RelationshipStatuses.None:
				text = "Follow";
				cls = "btn-success";
				break;
			case RelationshipStatuses.Minimal:
				text = "Unfollow";
				cls = "btn-danger";
				break;
			case RelationshipStatuses.Member:
			case RelationshipStatuses.Owner:
				text = "Manage";
				cls = "btn-warning";

		}
		return <button ref={this.btn} onClick={this.processClick.bind(this)} className={"btn " + cls}>{text}</button>;
	}
	processClick() {
		var User = this.props.ProfileUser;
		var Status = this.state.Status;
		var history = this.props.history;

		var href = "/a/" + User.username + "/";
		var btn = this.btn.current;
		btn.disabled = true;

		if (Status > RelationshipStatuses.Minimal) {
			history.push(href + "manage");
		}
		else {
			//Toggle following
			var id = User.artistId;
			var newStatus = (Status == RelationshipStatuses.Minimal ? RelationshipStatuses.None:RelationshipStatuses.Minimal);
			mApi.post("api", `artist/${id}/follow`).fail(e => {
				console.error(e);
				btn.disabled = false;
			}).done(data => {
				this.setState({
					Status: newStatus
				});
				btn.disabled = false;
			});
		}
	}
}