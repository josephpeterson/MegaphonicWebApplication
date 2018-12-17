import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import mApi from '../../services/MegaphonicAPI';
import FormErrors from "../../components/FormErrors";
import $ from 'jquery';

class CreatePost extends Component {
	constructor(props) {
		super(props);

		this.form = React.createRef();
		this.errors = React.createRef();
		this.state = {
			expanded: false
		}
	}
	render() {
		var expanded = this.state.expanded;

		if (!expanded) {
			return <button onClick={() => {
				this.setState({ expanded: true });
			}}
				className="btn btn-success">Create Post...</button>;
		}
		return (
			<div className="row">
				<div className="col-md-8 col-md-offset-2">
					<h3>Create post</h3>
					<FormErrors ref={this.errors} />
					<form ref={this.form}>
						<div className="form-group">
							<label htmlFor="title">Title <span className="require">*</span></label>
							<input type="text" className="form-control" name="Title" />
						</div>
						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea rows="5" className="form-control" name="Content" ></textarea>
						</div>

						<div className="form-group">
							<p><span className="require">*</span> - required fields</p>
						</div>

						<div className="form-group">
							<button onClick={this.ProcessForm.bind(this)} type="submit" className="btn btn-primary">
								Create
							</button>
							<button className="btn btn-default" onClick={() => {
								this.setState({ expanded: false });
							}}>
								Cancel
    		        		</button>
						</div>
					</form>
				</div>

			</div >
		)
	}
	DisplayErrors(res) {
		$(this.form.current).find(":input,button").removeAttr("disabled");
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
	ProcessForm(event) {
		event.preventDefault();
		var User = this.props.MegaUser;
		var LocationId = this.props.LocationId;
		var LocationType = this.props.LocationType;
		var form = $(this.form.current);
		
	
		var data = {
			PostLocation: {
				LocationId: LocationId,
				LocationType: LocationType //TODO change this this is only for profile posting!!!
			}
		}
		form.serializeArray().forEach(d => {
			data[d.name] = d.value;
		});
		form.find(":input,button").prop("disabled", true);


		console.log(data);

		mApi.post("api", "feed/create", data).fail(this.DisplayErrors.bind(this)).done(post => {
			//console.log(post);
			window.location.reload();
		});
	}
}
export default CreatePost;