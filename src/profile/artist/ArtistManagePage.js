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
	loadFormData() {
		var id = this.props.ProfileUser.artistId;
		mApi.get("api", `artist/${id}/manage`).fail(e => {
			this.errors.current.setState({
				Errors: [{
					message: e.statusText
				}]
			});
		}).done(artistData => {
			this.setState({
				loaded: true,
				Artist: artistData
			});
		});
	}
	addMember(member, comp) {
		var members = this.state.Artist.members;
		var artist = this.state.Artist;
		members.push({
			accountId: member.accountId,
			FullName: member.firstName + " " + member.lastName,
			username: member.username,
			status: 2
		});
		artist.members = members;
		this.setState({
			Artist: artist
		});
		comp.reset();
	}
	removeMember(member) {
		var members = this.state.Artist.members.filter(m => m != member);
		var artist = this.state.Artist;
		artist.members = members;
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
		this.state.Artist.members.forEach((m, i) => {
			if (i == 0)
				return;
			data.members.push({
				accountId: m.accountId,
				status: m.status
			});
		});
		form.find(":input,button").prop("disabled", true);

		var id = this.state.Artist.artistId;
		mApi.post("api", `artist/${id}/manage`, data).done(d => {
			window.location = "/a/" + data.username;
		}).fail(res => {
			form.find(":input,button").removeAttr("disabled");
			this.errors.current.setState({
				Errors: res.responseJSON
			});
		});
	}
	render() {
		const { loaded, Artist } = this.state;

		if (!loaded) {
			return (<div className="container p-5">
				<div className="row justify-content-center p-5">
					<img src="/img/loading.svg" />
				</div>
			</div>);
		}
		var members = Artist.members;

		var ignoreUsers = [];

		members.forEach(member => {
			ignoreUsers.push(member.username);
		});


		var input_username = Artist.username;
		var input_title = Artist.title;
		var input_biography = Artist.biography;
		var input_stateCode = Artist.stateCode;
		var input_zipCode = Artist.zipCode;
		var input_cityName = Artist.cityName;

		return (
			<div className="">
				<div className='card m-3'>
					<h4 className="card-header">Artist Settings</h4>

					<div className='card-body'>
						<p>You may change any artist/profile settings here. You may also add/remove members from your organization here.</p>
						<FormErrors ref={this.errors} />
						<form ref={this.form}>
							<div className="form-group">
								<label htmlFor="Username">Artist username</label>
								<input defaultValue={input_username} type="text" name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Artist Username" />
								<small id="emailHelp" className="form-text text-muted">This username is used to access your profile and differentiate from other artists</small>
							</div>
							<div className="form-group">
								<label htmlFor="Title">Title</label>
								<input defaultValue={input_title} name="title" type="text" className="form-control" id="exampleInputPassword1" placeholder="Artist/Band Name" />
							</div>
							<div className="form-group">
								<label htmlFor="Biography">Biography</label>
								<textarea defaultValue={input_biography} name="biography" type="text" className="form-control" id="exampleInputPassword1" placeholder="Biography" />
							</div>
							<div className="form-row">
								<div className="form-group col-md-6">
									<label htmlFor="inputCity">City</label>
									<input type="text" className="form-control" placeholder="City" name="CityName" defaultValue={input_cityName} />
								</div>
								<div className="form-group col-md-4">
									<label htmlFor="inputState">State</label>
									<select className="form-control" name="StateCode" defaultValue={input_stateCode}>
										<option value="" defaultValue>State</option>
										<option value="AL">Alabama</option>
										<option value="AK">Alaska</option>
										<option value="AZ">Arizona</option>
										<option value="AR">Arkansas</option>
										<option value="CA">California</option>
										<option value="CO">Colorado</option>
										<option value="CT">Connecticut</option>
										<option value="DE">Delaware</option>
										<option value="DC">District Of Columbia</option>
										<option value="FL">Florida</option>
										<option value="GA">Georgia</option>
										<option value="HI">Hawaii</option>
										<option value="ID">Idaho</option>
										<option value="IL">Illinois</option>
										<option value="IN">Indiana</option>
										<option value="IA">Iowa</option>
										<option value="KS">Kansas</option>
										<option value="KY">Kentucky</option>
										<option value="LA">Louisiana</option>
										<option value="ME">Maine</option>
										<option value="MD">Maryland</option>
										<option value="MA">Massachusetts</option>
										<option value="MI">Michigan</option>
										<option value="MN">Minnesota</option>
										<option value="MS">Mississippi</option>
										<option value="MO">Missouri</option>
										<option value="MT">Montana</option>
										<option value="NE">Nebraska</option>
										<option value="NV">Nevada</option>
										<option value="NH">New Hampshire</option>
										<option value="NJ">New Jersey</option>
										<option value="NM">New Mexico</option>
										<option value="NY">New York</option>
										<option value="NC">North Carolina</option>
										<option value="ND">North Dakota</option>
										<option value="OH">Ohio</option>
										<option value="OK">Oklahoma</option>
										<option value="OR">Oregon</option>
										<option value="PA">Pennsylvania</option>
										<option value="RI">Rhode Island</option>
										<option value="SC">South Carolina</option>
										<option value="SD">South Dakota</option>
										<option value="TN">Tennessee</option>
										<option value="TX">Texas</option>
										<option value="UT">Utah</option>
										<option value="VT">Vermont</option>
										<option value="VA">Virginia</option>
										<option value="WA">Washington</option>
										<option value="WV">West Virginia</option>
										<option value="WI">Wisconsin</option>
										<option value="WY">Wyoming</option>
									</select>
								</div>
								<div className="form-group col-md-2">
									<label htmlFor="inputZip">Zip</label>
									<input type="text" pattern="[0-9]{5}" className="form-control" name="ZipCode" defaultValue={input_zipCode} />
								</div>
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
											var username = member.username;
											var name = member.fullName;
											var status;

											for (var s in RelationshipStatuses) {
												if (RelationshipStatuses[s] == member.status)
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