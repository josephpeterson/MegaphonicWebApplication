import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../../services/MegaphonicAPI';

class UserDirectory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		}
	}
	componentDidMount() {
		mApi.get("api", "user/all").fail(e => {
			this.setState({
				loading: false,
				error: e.statusText
			});
		}).done(data => {
			this.setState({
				loading: false,
				data: data
			});
		});
	}
	retry() {
		this.setState({
			loading: true
		});
		this.componentDidMount();
	}
	render() {
		const { loading, data, error } = this.state;

		if (loading) {
			return (
				<div className='card m-3'>
					<div className='card-body'>
						<h3>User Directory</h3>
						<div className="container">
							<div className="row justify-content-center">
								<img src="/img/loading.svg" />
							</div>
						</div>
					</div>
				</div>
			);
		}
		if (error) {
			return (
				<div className='card m-3'>
					<div className='card-body'>
						<h3>User Directory</h3>
						<div className="container">
							<div className="alert alert-danger" role="alert">
								{error}
							</div>
							<button className="btn btn-info" onClick={this.retry.bind(this)}>Try Again</button>
						</div>
					</div>
				</div>
			);
		}

		//Parse the data
		var records = JSON.parse(data);
		return (
			<div className='card m-3'>
				<div className='card-body'>
					<h3>User Directory</h3>
					<p>Currently while search is being developed, you may access other peoples profiles by the links below:</p>
					<div className="container">
						{records.map((user, id) =>
							<div key={id} className="row">
								<a href={"/p/" + user.Username}>
									{user.Username} ({user.FirstName + " " + user.LastName})
				  </a>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default UserDirectory;