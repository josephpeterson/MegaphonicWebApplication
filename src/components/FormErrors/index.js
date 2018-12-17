import React, { Component } from 'react';

class FormErrors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Errors: []
		}
	}
	render() {
		var errors = this.state.Errors;
		return (<div>
			{errors.map((e, i) => <div key={i} className="alert alert-danger">{e.message}</div>)}
		</div>);
	}
}
export default FormErrors;