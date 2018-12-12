import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import mApi from '../../../services/MegaphonicAPI';

class TabEdit extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();
	}
	render() {
		var history = this.props.history;
		var user = this.props.MegaUser;

		return (
			<div className="container col-sm">
				<form ref={this.form}>
				<h2>Edit Profile</h2>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Name</label>
						<div className="form-row">
							<div className="col">
								<input type="text" className="form-control" placeholder="First name" name="FirstName" defaultValue={user.FirstName}/>
							</div>
							<div className="col">
								<input type="text" className="form-control" placeholder="Last name" name="LastName" defaultValue={user.LastName}/>
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Email</label>
						<input type="text" className="form-control" placeholder="1234 Main St" name="Email" defaultValue={user.Email}/>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input type="password" className="form-control mb-3" placeholder="Password" />
						<input type="password" className="form-control" placeholder="Confirm Password" />
					</div>
					<div className="form-group">
						<label htmlFor="inputAddress">Address</label>
						<input type="text" className="form-control" placeholder="1234 Main St" name="StreetAddress" defaultValue={user.StreetAddress} disabled/>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="inputCity">City</label>
							<input type="text" className="form-control" placeholder="City" name="CityName" defaultValue={user.CityName}/>
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputState">State</label>
							<select className="form-control" name="StateCode" defaultValue={user.StateCode}>
								<option defaultValue>Choose...</option>
								<option>...</option>
							</select>
						</div>
						<div className="form-group col-md-2">
							<label htmlFor="inputZip">Zip</label>
							<input type="text" className="form-control" name="ZipCode" defaultValue={user.ZipCode}/>
						</div>
					</div>
					<div className="form-row float-right">
							<button onClick={this.ProcessForm.bind(this)} type="button" className="btn btn-primary m-2">Save Changes</button>
							<button type="button" onClick={history.goBack} className="btn btn-danger m-2">Cancel</button>
					</div>
				</form>
			</div>)
	}
	ProcessForm() {
		var form = $(this.form.current);
		var data = form.serialize();

		form.find(":input,button").prop("disabled",true);

		mApi.post("api","user",data).done(data => {
			//todo move this to lower level logic
			if(!data.isSuccessCode)
			{
				alert("err");
			}
			else
				console.log("Data saved!");
			//window.location = "/me";
		}).fail(err => {
			alert("Could not save changes");
			console.log(err);
			form.find(":input,button").removeProp("disabled");
		});
	}
}
export default TabEdit;