import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';

import FormErrors from "../../components/FormErrors";
import UserSearchInput from "../../components/UserSearchInput";


//TODO restrict this to only allowed users
const RelationshipStatuses = {
	Blocked: -1,
	None: 0,
	Minimal: 1,
	Member: 2,
	Owner: 3
};


class ArtistManagePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			members: []
		}
		this.errors = React.createRef();
		this.form = React.createRef();
	}
	componentDidMount() {
		this.loadFormData();
		this.setState({
			loaded: false
		});
	}
	loadFormData()
	{
		var id = this.props.ProfileUser.Username;

		mApi.get("api",`artist/${id}/manage`).fail(e => {
			this.setState({
				loaded: true,
			});
			this.errors.current.setState({
				Errors: [{
					message: e.statusText
				}]
			});
		}).done(data => {
			this.setState({
				loaded: true,
				Artist: JSON.parse(data)
			});
		});
	}
	addMember(member, comp) {
		var members = this.state.Artist.Members;
		members.push({
			AccountId: member.AccountId,
			FullName: member.FirstName + " " + member.LastName,
			Username: member.Username,
			Status: 2
		});
		this.setState({
			members: members
		});
		comp.reset();
	}
	removeMember(member) {
		var members = this.state.Artist.Members.filter(m => m != member);

		var artist = this.state.Artist;
		artist.Members = members;

		this.setState({
			Artist: artist
		});
	}
	ProcessForm(event) {
		event.preventDefault();
		var form = $(this.form.current);

		var data = {};
		form.serializeArray().forEach(d => {
			data[d.name] = d.value;
		});

		
		data.members = [];
		this.state.Artist.Members.forEach((m, i) => {
			if (i == 0)
				return;
			data.members.push({
				AccountId: m.AccountId,
				Status: m.Status
			});
		});
		form.find(":input,button").prop("disabled", true);

		var errorResponse = (res) => {
			form.find(":input,button").removeAttr("disabled");
			this.errors.current.setState({
				Errors: [{
					code: res.statusCode,
					message: res.statusText
				}]
			});
		}

		var id = this.state.Artist.Username;
		mApi.post("api", `artist/${id}/manage`, data).done(d => {
			window.location = "/a/" + data.Username;
		}).fail(res => {
			errorResponse(res);
		});
	}
	render() {
		const { loaded, Artist} = this.state;

		if (!loaded) {
			return (<div className="container p-5">
				<div className="row justify-content-center p-5">
					<img src="/img/loading.svg" />
				</div>
			</div>);
		}
		var members = Artist.Members;

		var ignoreUsers = [];

		members.forEach(member => {
			ignoreUsers.push(member.Username);
		});

		return (
			<div className="">
				<div className='card m-3'>
					<div className='card-body'>
						<h4>Artist Settings</h4>
						<p>You may change any artist/profile settings here. You may also add/remove members from your organization here.</p>
						<FormErrors ref={this.errors} />
						<form ref={this.form}>
							<div className="form-group">
								<label htmlFor="Username">Artist username</label>
								<input defaultValue={Artist.Username} type="text" name="Username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Artist Username" />
								<small id="emailHelp" className="form-text text-muted">This username is used to access your profile and differentiate from other artists</small>
							</div>
							<div className="form-group">
								<label htmlFor="Title">Title</label>
								<input defaultValue={Artist.Title} name="Title" type="text" className="form-control" id="exampleInputPassword1" placeholder="Artist/Band Name" />
							</div>
							<div className="form-group">
								<label htmlFor="Biography">Biography</label>
								<textarea defaultValue={Artist.Biography} name="Biography" type="text" className="form-control" id="exampleInputPassword1" placeholder="Biography" />
							</div>
							<div className="form-group">
								<label htmlFor="exampleInputPassword1">Members</label>
								<table className="table">
									<thead>
										<tr>
											<th>Username</th>
											<th>Full Name</th>
											<th>Status</th>
											<th>Options</th>
										</tr>
									</thead>
									<tbody>
										{members.map((member, i) => {
											var username = member.Username;
											var name = member.FullName;
											var status;

											for (var s in RelationshipStatuses) {
												if (RelationshipStatuses[s] == member.Status)
													status = s;
											}
											return (
												<tr key={i}>
													<td>{username}</td>
													<td>{name}</td>
													<td>{status}</td>
													<td>
														<button onClick={event => {
															event.preventDefault();
															this.removeMember(member);
														}} className="btn btn-danger" disabled={i == 0}>Remove</button>
													</td>
												</tr>
											)
										}
										)}
									</tbody>
								</table>
								<UserSearchInput title="Add Member" Ignore={ignoreUsers} onValid={this.addMember.bind(this)} />
							</div>
							<button type="submit" onClick={this.ProcessForm.bind(this)} className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default ArtistManagePage;