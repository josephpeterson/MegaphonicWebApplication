// Copyright (c) Megaphonic LLC 2018. All rights reserved.
// Joseph Peterson
import React, { Component } from 'react';

class ErrorNotFound extends Component {
	render() {
		return (
			<div className="m-5 alert alert-danger">
				<h3>Page Not Found</h3>
				<p>The page you have requested is not found.</p>
			</div>
		)
	}
}
export default ErrorNotFound