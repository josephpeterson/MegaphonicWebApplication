import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../../services/MegaphonicAPI';

class BandDirectory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		}
	}
	componentDidMount() {
		mApi.get("api", "artist").fail(e => {
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

		var records = data;
		return (
			<div className='card m-3'>
				<div className='card-body'>
					<h3>Band Directory</h3>
					<p>Currently while search is being developed, you may view all bands or create your own here:</p>
					<div className="container">
						{records.map((user, id) =>
							<div key={id} className="row">
								<a href={"/a/" + user.username}>
									{user.username} ({user.title})
				  </a>
							</div>
						)}
					</div>
					<button className="btn btn-success m-3" onClick={() => {window.location="/create/artist"}}>Create Band</button>
				</div>
			</div>
		);
	}
}
export default BandDirectory;