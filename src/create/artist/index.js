import React, { Component } from 'react';
import UserSearchInput from '../../components/UserSearchInput';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';
import FormErrors from '../../components/FormErrors';

const RelationshipStatuses = {
	Blocked: -1,
	None: 0,
	Minimal: 1,
	Member: 2,
	Owner: 3
};

class CreateArtistForm extends Component {
	constructor(props) {
		super(props);

		var u = props.MegaUser;
		this.state = {
			members: [{
				MegaUser: u,
				Status: 3
			}]
		}
		this.form = React.createRef();
		this.errors = React.createRef();
	}
	componentDidMount() {

	}
	addMember(member, comp) {
		var members = this.state.members;
		members.push({
			MegaUser: member,
			Status: 2
		});
		this.setState({
			members: members
		});
		comp.reset();
	}
	removeMember(member)
	{
		var members = this.state.members.filter(m => m != member);
		this.setState({
			members: members
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
		this.state.members.forEach((m,i) => {
			if(i == 0)
				return;
			data.members.push({
				AccountId: m.MegaUser.AccountId,
				Status: m.Status
			});
		});
		form.find(":input,button").prop("disabled", true);

		var errorResponse = (res) => {
			form.find(":input,button").removeAttr("disabled");
			if (res.responseJSON)
				this.errors.current.setState({
					Errors: res.responseJSON
				});
			console.log(res);
		}
		mApi.post("api", "artist/create", data).done(d => {
			window.location = "/a/" + data.Username;
		}).fail(res => {
			errorResponse(res);
		});
	}
	render() {
		var members = this.state.members;

		var ignoreUsers = [];

		members.forEach(member => {
			ignoreUsers.push(member.MegaUser.Username);
		});

		return (
			<div className="">
				<div className='card m-3'>
					<div className='card-body'>
						<h4>New Artist</h4>
						<p>This form is used to create a new artist profile. Once you create an artist profile people may follow and interact with the content you provide. You will then be able to upload new music and video content to share amongst your followers. Soon you will also be able to connect with our venues to seemlessly book events.</p>
						<FormErrors ref={this.errors}/>
						<form ref={this.form}>
							<div className="form-group">
								<label htmlFor="Username">Artist username</label>
								<input type="text" name="Username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Artist Username" />
								<small id="emailHelp" className="form-text text-muted">This username is used to access your profile and differentiate from other artists</small>
							</div>
							<div className="form-group">
								<label htmlFor="Title">Title</label>
								<input name="Title" type="text" className="form-control" id="exampleInputPassword1" placeholder="Artist/Band Name" />
							</div>
							<div className="form-group">
								<label htmlFor="Biography">Biography</label>
								<textarea name="Biography" type="text" className="form-control" id="exampleInputPassword1" placeholder="Biography" />
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
											var username = member.MegaUser.Username;
											var name = member.MegaUser.FirstName + " " + member.MegaUser.LastName;
											var status;

											for(var s in RelationshipStatuses)
											{
												if(RelationshipStatuses[s] == member.Status)
													status = s;
											}
											return (
												<tr key={i}>
													<td>{username}</td>
													<td>{name}</td>
													<td>{status}</td>
													<td>
														<button onClick={event => {
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
export default CreateArtistForm;