import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';
import FormErrors from '../../components/FormErrors';

class TabEdit extends Component {
	constructor(props) {
		super(props);
		this.form = React.createRef();
		this.errorContainer = React.createRef();
	}
	render() {
		var history = this.props.history;
		var user = this.props.MegaUser;

		var FirstName = user.firstName;
		var LastName = user.lastName;
		var Email = user.email;
		var Username = user.username;
		var StreetAddress = user.streetName;
		var CityName = user.cityName;
		var StateCode = user.stateCode;
		var ZipCode = user.zipCode;

		return (
			<div className="container col-sm">
				<h3>Edit Profile</h3>

				<div className="alert alert-warning">
					These features are incomplete:
				<ul>
						<li>Change/Update passwords</li>
						<li>Change email address</li>
					</ul>
				</div>
				<form ref={this.form}>
					<FormErrors ref={this.errorContainer} />
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Name</label>
						<div className="form-row">
							<div className="col">
								<input type="text" className="form-control" placeholder="First name" name="FirstName" defaultValue={FirstName} />
							</div>
							<div className="col">
								<input type="text" className="form-control" placeholder="Last name" name="LastName" defaultValue={LastName} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Email</label>
						<input type="text" className="form-control" placeholder="Email Address" name="Email" defaultValue={Email} />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input type="password" className="form-control mb-3" placeholder="Password" />
						<input type="password" className="form-control" placeholder="Confirm Password" />
					</div>
					<div className="form-group">
						<label htmlFor="inputAddress">Address</label>
						<input type="text" className="form-control" placeholder="Street Address" name="StreetAddress" defaultValue={StreetAddress} />
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="inputCity">City</label>
							<input type="text" className="form-control" placeholder="City" name="CityName" defaultValue={CityName} />
						</div>
						<div className="form-group col-md-4">
							<label htmlFor="inputState">State</label>
							<select className="form-control" name="StateCode" defaultValue={StateCode}>
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
							<input type="text" pattern="[0-9]{5}" className="form-control" name="ZipCode" defaultValue={ZipCode} />
						</div>
					</div>


					<div className="form-row">
						<div className="form-group col-md-3 ml-auto">
							<label htmlFor="VerifyPassword">Current Password</label>
							<input type="password" className="form-control" name="VerifyPassword" />
						</div>
					</div>
					<div className="form-row float-right">
						<button onClick={this.ProcessForm.bind(this)} type="submit" className="btn btn-primary m-2">Save Changes</button>
						<button type="button" onClick={history.goBack} className="btn btn-danger m-2">Cancel</button>
					</div>
				</form>
			</div>)
	}
	ProcessForm(event) {
		event.preventDefault();
		var form = $(this.form.current);
		var data = form.serialize();

		form.find(":input,button").prop("disabled", true);

		var errorResponse = (res) => {
			form.find(":input,button").removeAttr("disabled");
			if (res.responseJSON)
				this.errorContainer.current.setState({
					Errors: res.responseJSON
				});
			console.log(res);
		}
		mApi.post("api", "user", data).done(data => {
			window.location = "/me";
		}).fail(res => {
			errorResponse(res);
		});
	}
}
export default TabEdit;