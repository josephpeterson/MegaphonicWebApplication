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
		var records = data;
		return (
			<div className='card m-3'>
				<div className='card-body'>
					<h3>User Directory</h3>
					<p>Currently while search is being developed, you may access other peoples profiles by the links below:</p>
					<table className="table table-striped table-hover">
						<thead className="thead">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Username</th>
								<th scope="col">Full Name</th>
							</tr>
						</thead>
						<tbody>
							{records.map((user, id) =>
								<tr className={user.accountId == this.props.MegaUser.accountId ? "table-success":""} onClick={() => {
									this.props.history.push("/p/" + user.username);
								}} key={id} style={{
									cursor: "pointer"
								}}>
									<td>{user.accountId}</td>
									<td>{user.username}</td>
									<td>{user.firstName} {user.lastName}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
export default UserDirectory;