import React, { Component } from 'react';
import $ from 'jquery';
import mApi from '../../services/MegaphonicAPI';
import "./main.css";

class UserDirectory extends Component {
	constructor(props) {
		super(props);

		this.inputSearch = React.createRef();

		this.state = {
			loading: false,
			disabled: false,
			title: this.props.title ? this.props.title:"Username Search"
		}
	}
	componentDidMount() {

	}
	search() {
		var val = this.inputSearch.current.value;
		if (!val || val.trim().length == 0) {
			this.setState({
				loading: false,
				data: null
			});
			return;
		}
		this.setState({
			loading: true
		});
		mApi.get("api", "user/search?q=" + val).fail(e => {
			this.setState({
				loading: false,
				error: e.statusText
			});
		}).done(data => {
			this.setState({
				loading: false,
				data: JSON.parse(data)
			});
		});
	}
	selectOption(event, acc) {
		var callback = this.props.onValid;
		if (callback)
			callback(acc, this);
		else
			this.select(acc);
	}
	select(acc) {
		this.inputSearch.current.value = acc.Username;
		this.setState({
			loading: false,
			disabled: true
		});
	}
	reset() {
		this.inputSearch.current.value = this.props.value ? this.props.value : "";
		this.setState({
			loading: false,
			disabled: false,
			data: null,
		});
	}
	value() {
		return this.inputSearch.current.value;
	}
	render() {
		const { loading, data, error, disabled, title } = this.state;

		var results = [];
		if (data) {
			results = data.filter(r => {
				return this.props.Ignore.indexOf(r.Username) == -1;
			});
		}
		return (
			<div className="dropdown inputUserSearch">
				<div className="input-group mb-3" style={{ width: 600 }}>
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon3">{title}</span>
					</div>
					<input autoComplete="off" disabled={disabled} ref={this.inputSearch} type="text" onKeyUp={this.search.bind(this)} className={"form-control " + (loading ? "loading" : "")} id="basic-url" aria-describedby="basic-addon3" />
				</div>
				{results.length > 0 &&
					<div style={{ width: 600 }} className="show dropdown-menu" aria-labelledby="navbarDropdown">
						{results.map((acc, i) => {
							return (
								<a onClick={(event) => {
									this.selectOption(event, acc);
								}} key={i} className="dropdown-item" href="#">{acc.Username}</a>
							)
						})}
						<h6 className="dropdown-header">{results.length} user{results.length > 1 ? "s" : ""} found</h6>
					</div>
				}
			</div>
		);
	}
}
export default UserDirectory;